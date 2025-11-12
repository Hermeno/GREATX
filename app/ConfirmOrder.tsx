import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();

  const menu = () => {
    router.push('./Checkout');
  };

  return (
    <View className="flex-1 bg-black items-center">
      
      {/* Cabeçalho */}
      <View className="justify-center items-center mt-12 mb-5">
        <TouchableOpacity
          onPress={menu}
          className="w-20 h-20 rounded-full border-2 border-white justify-center items-center mt-5 mb-2"
        >
          <Text className="text-white text-base"></Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View className="items-center mt-5">
        <Text className="text-white text-2xl font-bold text-center w-3/5">
          Aproxime na máquina para confirmar seu pedido
        </Text>

        <TouchableOpacity
          onPress={menu}
          className="w-52 h-52 rounded-full bg-blue-500 mt-10 mb-5 justify-center items-center"
        >
          {/* <Image source={require('../assets/image/ddd.png')} className="w-52 h-52 rounded-full" /> */}
        </TouchableOpacity>
      </View>

      {/* Botão inferior */}
      <View className="items-center mt-5 w-full">
        <TouchableOpacity
          onPress={menu}
          className="bg-blue-600 w-4/5 rounded-2xl py-3 px-10 items-center justify-center"
        >
          <Text className="text-white text-lg text-center font-semibold">
            Aproxime o celular no NFC da entrada, por favor
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
