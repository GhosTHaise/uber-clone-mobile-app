import { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "./customButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists" || result.code === "success") {
        router.push("/(root)/(tabs)/home");
      }

      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        className="mt-5 w-full shadow-none"
        title="Sign in with Google"
        onPress={handleGoogleLogin}
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-2"
            resizeMode="contain"
            alt="google"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
      />
    </View>
  );
};

export default OAuth;
