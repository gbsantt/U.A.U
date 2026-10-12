import {
    GestureHandlerRootView,
} from "react-native-gesture-handler";

import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular";
import { Roboto_500Medium } from "@expo-google-fonts/roboto/500Medium";
import { Roboto_700Bold } from "@expo-google-fonts/roboto/700Bold";
import { Roboto_900Black } from "@expo-google-fonts/roboto/900Black";
import BrandLoading from "./src/components/BrandLoading";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

void SplashScreen.preventAutoHideAsync().catch(() => {});

import {
    FavoritesProvider,
} from "./src/context/FavoritesContext";

import {
    AuthProvider,
} from "./src/context/AuthContext";


export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        "Roboto-Regular": Roboto_400Regular,
        "Roboto-Medium": Roboto_500Medium,
        "Roboto-Bold": Roboto_700Bold,
        "Roboto-Black": Roboto_900Black,
    });
    useEffect(() => {
        if (fontsLoaded || fontError) void SplashScreen.hideAsync().catch(() => {});
    }, [fontsLoaded, fontError]);
    if (!fontsLoaded && !fontError) return <BrandLoading />;

    return (

        <GestureHandlerRootView
            style={{
                flex: 1,
            }}
        >

            <SafeAreaProvider>
            <ThemeProvider>
            <AuthProvider>

                <FavoritesProvider>

                    <AppNavigator />

                </FavoritesProvider>

            </AuthProvider>
            </ThemeProvider>
            </SafeAreaProvider>

        </GestureHandlerRootView>

    );
}
