import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
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