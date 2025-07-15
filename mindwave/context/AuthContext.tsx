import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    email: string;
    password: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@mindwave_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load user data from AsyncStorage on app start
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
            if (userData) {
                const parsedUser = JSON.parse(userData);
                // Check if user has all required fields
                if (parsedUser.email && parsedUser.password && parsedUser.name) {
                    setUser(parsedUser);
                } else {
                    // If user data is incomplete, clear it
                    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
                }
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, name: string) => {
        try {
            // In a real app, you would validate credentials with a server
            const userData: User = {
                email,
                password,
                name
            };

            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);

            // Navigate to home after successful login
            router.replace('/(root)/(tabs)');
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const userData: User = {
                email,
                password,
                name
            };

            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);

            // Navigate to home after successful registration
            router.replace('/(root)/(tabs)');
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);

            // Navigate to login after logout
            router.replace('/(root)/sign-in');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
