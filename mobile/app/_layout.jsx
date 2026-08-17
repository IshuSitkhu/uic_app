import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";


export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
      </Stack>

      <Toast/>
    </>
  );
}