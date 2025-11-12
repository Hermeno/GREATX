import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function Welcome() {
  const router = useRouter();

  const menu = () => {
    router.push('./ChooseEstablishment');
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Cabeçalho */}
      <View className="items-center mb-10 mt-10">
      <Text className="text-white text-2xl font-semibold">Olá, Fernando!</Text>
      <Text className="text-white text-2xl font-bold mt-1">Bem-vindo ao</Text>
      </View>

      {/* Imagem Circular */}
      <TouchableOpacity
      onPress={menu}
      className="w-48 h-48 rounded-full bg-transparent border-2 border-white flex items-center justify-center mb-6"
      >
      {/* Caso queira ativar a imagem, remova o comentário */}
      {/* <Image
        source={require('../assets/image/bbb.png')}
        className="w-48 h-48 rounded-full"
        resizeMode="cover"
      /> */}
      </TouchableOpacity>

      {/* Mensagem principal */}
      <View className="items-center mb-10">
      <Text className="text-white text-2xl font-bold text-center w-3/4">Desculpe, você</Text>
      <Text className="text-white text-2xl font-bold text-center w-3/4">não está próximo</Text>
      <Text className="text-white text-2xl font-bold text-center w-3/4 mt-2">
        Vamos lá para abrir sua mesa
      </Text>
      </View>

      {/* Botão principal */}
      <TouchableOpacity
      onPress={menu}
      className="bg-[#007bff] rounded-2xl px-10 py-4 w-4/5 items-center"
      >
      <Text className="text-white text-lg text-center">
        Entrar para ver programação e promoções
      </Text>
      </TouchableOpacity>
    </View>
  );
}
