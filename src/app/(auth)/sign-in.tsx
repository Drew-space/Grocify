import { AuthView } from "@clerk/expo/native";
import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import useSocialAuth from "@/hooks/useSocialAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  return (
    <SafeAreaView>
      <Text className="flex-1 text-red-500 bg-primary ">Hey everyone</Text>
    </SafeAreaView>
  );
}
