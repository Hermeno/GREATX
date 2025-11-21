import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";


export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="flex-1 bg-[#ffffff]">
        
        {/* Header MEMOIZADO (não pisca mais) */}
        <Header />

        <View className="flex-1">
          {children}
        </View>

      </SafeAreaView>
    </>
  );
}
