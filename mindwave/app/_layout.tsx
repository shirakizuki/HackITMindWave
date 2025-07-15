import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {

  const [loadFonts] = useFonts({
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf')
  })

  useEffect(() => {
    const loadFonts = async () => {
      SplashScreen.hideAsync();
    };

    loadFonts();
  })

  if(!loadFonts) return null;

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}

