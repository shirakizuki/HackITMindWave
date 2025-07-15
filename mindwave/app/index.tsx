import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
    const { user, isLoading } = useAuth();

    // Show loading spinner while checking auth state
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    // Redirect based on authentication state
    if (user && user.email && user.password && user.name) {
        return <Redirect href="/(root)/(tabs)" />;
    }

    return <Redirect href="/(root)/sign-in" />;
}
