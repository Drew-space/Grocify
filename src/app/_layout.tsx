import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import "../../global.css";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
export default function RootLayout() {
  const colorSheme = useColorScheme();
  return (
    <>
      <ClerkProvider publishableKey={publishableKey}>
        <ThemeProvider value={colorSheme === "dark" ? DarkTheme : DarkTheme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
}
