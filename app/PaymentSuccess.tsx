import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Layout from './home/_template';

export default function PaymentSuccess() {
  const router = useRouter();

  const goToMenu = () => router.push('./MenuOptions'); // voltar ao menu
  const goToOrders = () => router.push('./pedidos'); // ex: histórico de pedidos

  return (
    <Layout>
      <View className="flex-1 bg-[#FFFFFF] justify-center items-center px-6">
        {/* Ícone de sucesso */}
        <View className="bg-green-500 w-32 h-32 rounded-full items-center justify-center shadow-lg mb-8">
          <MaterialCommunityIcons name="check-circle-outline" size={80} color="#fff" />
        </View>

        {/* Texto de confirmação */}
        <Text className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
          Pagamento Concluído!
        </Text>
        <Text className="text-lg text-gray-700 mb-10 text-center">
          Seu pedido foi realizado com sucesso. Obrigado por escolher nosso restaurante!
        </Text>

        {/* Botão Voltar ao Menu */}
        <TouchableOpacity
          onPress={goToMenu}
          activeOpacity={0.85}
          className="flex-row items-center justify-center w-full py-5 rounded-3xl bg-orange-600 shadow-md mb-4"
        >
          <MaterialCommunityIcons name="home-outline" size={24} color="#fff" />
          <Text className="text-white text-xl font-bold ml-3 text-center">Voltar ao Menu</Text>
        </TouchableOpacity>

        {/* Botão Ver Pedidos */}
        <TouchableOpacity
          onPress={goToOrders}
          activeOpacity={0.85}
          className="flex-row items-center justify-center w-full py-5 rounded-3xl bg-gray-700 shadow-md"
        >
          <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="#fff" />
          <Text className="text-white text-xl font-bold ml-3 text-center">Ver Pedidos</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
