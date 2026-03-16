import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import useSocialAuth from "@/hooks/useSocialAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-secondary">
      {/* decorative elements */}
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />
    </SafeAreaView>
  );
}
