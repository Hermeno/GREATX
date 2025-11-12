import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#003761] px-6">
      <StatusBar style="light" />

      {/* Título */}
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Bem-vindo ao
      </Text>

      {/* Logo */}
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
        }}
        className="w-32 h-32 rounded-full mb-10 border-4 border-[#00F7FF]"
      />

      {/* Botão Entrar */}
      <TouchableOpacity
        onPress={() => router.push('/login')}
        className="bg-[#FF00B6] w-64 py-3 rounded-full mb-4 shadow-md active:opacity-80"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Botão Criar Conta */}
      <TouchableOpacity
        onPress={() => router.push('/register')}
        className="border border-white w-64 py-3 rounded-full mb-6"
      >
        <Text className="text-white text-base font-medium text-center">
          Criar conta
        </Text>
      </TouchableOpacity>

      {/* Linha divisória */}
      <View className="flex-row items-center mb-6 w-64">
        <View className="flex-1 h-px bg-white/30" />
        <Text className="text-white mx-3 text-sm">ou</Text>
        <View className="flex-1 h-px bg-white/30" />
      </View>

      {/* Botões sociais */}
      <View className="flex-row gap-4">
        <TouchableOpacity className="flex-row items-center bg-[#DB4437] px-5 py-2 rounded-full">
          <FontAwesome name="google" size={20} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-[#4267B2] px-5 py-2 rounded-full">
          <FontAwesome name="facebook" size={20} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
