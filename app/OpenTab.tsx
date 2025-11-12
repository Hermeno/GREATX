import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Layout from './home/_template';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  qtd: number;
  image: string;
}

const items: MenuItem[] = [
  { id: 1, name: 'Prato de Sanduíche', price: 347, qtd: 2, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' },
  { id: 2, name: 'Hambúrguer Especial', price: 250, qtd: 1, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb1d' },
  { id: 3, name: 'Batata Frita com Molho', price: 150, qtd: 3, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
];

export default function OpenTab() {
  const router = useRouter();
  const goToOrder = () => router.push('./Order');
  const goToProfile = () => router.push('./Profile');
  const goBack = () => router.back();

  return (
    <Layout>
      <View className="flex-1 px-4 pt-10 pb-24 bg-[#F3F4F6] dark:bg-gray-900">
        {/* Cabeçalho */}
        <View className="items-center mb-6">
          <Text className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            Cardápio
          </Text>
          <View className="flex-row justify-between w-full mt-6 space-x-4">
            <TouchableOpacity
              onPress={goBack}
              activeOpacity={0.8}
              className="flex-1 bg-white dark:bg-gray-700 rounded-3xl py-4 items-center shadow-lg"
            >
              <Text className="text-gray-500 dark:text-gray-300 font-semibold">Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={goToProfile}
              activeOpacity={0.8}
              className="flex-1 bg-[#FF6F00] rounded-3xl py-4 items-center shadow-lg"
            >
              <Text className="text-white font-semibold">Promoções</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de itens */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={goToOrder}
              activeOpacity={0.85}
              className="flex-row items-center bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg mb-5 h-28"
            >
              <Image source={{ uri: item.image }} className="w-28 h-full rounded-l-3xl" resizeMode="cover" />
              <View className="flex-1 px-5 py-4 justify-center">
                <Text className="text-gray-900 dark:text-white text-xl font-bold">{item.name}</Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1 text-lg">R$: {item.price}</Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1 text-lg">Qtd: {item.qtd}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Botão Fixo: Finalizar */}
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={goToOrder}
            activeOpacity={0.85}
className="flex-row items-center justify-center w-4/5 py-4 rounded-3xl bg-[#D84315] shadow-xl"
          >
            <MaterialCommunityIcons name="cart-check" size={24} color="#fff" />
            <Text className="text-white text-xl font-semibold ml-2">Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
