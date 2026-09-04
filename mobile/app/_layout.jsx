import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
           <StatusBar style="dark" />
          <Stack initialRouteName="(dashboard)">
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            
          </Stack>

          <Toast/>
        </AuthProvider>
      </SafeAreaProvider>
      
    </>
  );
}