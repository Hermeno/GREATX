import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Layout from './home/_template';

const data = [
  { id: '1', factura: 'frasjhavdhs', Qtd: 2, preco: 10.0 },
  { id: '2', factura: 'vbnvbvcv', Qtd: 1, preco: 5.0 },
  { id: '3', factura: 'bbbn.fxl;d', Qtd: 3, preco: 15.0 },
  { id: '4', factura: 'frsdfasf', Qtd: 1, preco: 20.0 },
];

export default function ConfirmOrder() {
  const router = useRouter();
  const goNext = () => router.push('./PaymentSuccess'); // próxima tela
  const goToMenu = () => router.push('./Welcome'); // voltar ao menu

  // Calcula o total
  const total = data.reduce((acc, item) => acc + item.preco * item.Qtd, 0);

  return (
    <Layout>
      <View className="flex-1 bg-[#f7f7f7]">
        {/* Cabeçalho */}
        <View className="items-center justify-center py-10 ">
          <Text className="text-4xl text-gray-900 font-extrabold">Seu Pedido</Text>
        </View>

        {/* Conteúdo */}
        <ScrollView contentContainerStyle={{ paddingBottom: 180 }} className="px-4 mt-6">
          <View className="rounded-3xl p-5 shadow-md bg-white">
            <Text className="text-2xl font-bold mb-4">Resumo do Pedido - Fernando</Text>

            {/* Tabela */}
            <View className="border-b border-gray-300 pb-2 mb-2">
              <View className="flex-row">
                <Text className="flex-2 font-bold text-gray-900 text-lg">Factura</Text>
                <Text className="flex-1 font-bold text-gray-900 text-lg text-center">Qtd</Text>
                <Text className="flex-1 font-bold text-gray-900 text-lg text-right">Preço</Text>
              </View>
            </View>

            {/* Linhas de dados */}
            {data.map((item) => (
              <View key={item.id} className="flex-row py-3 border-b border-gray-200">
                <Text className="flex-2 text-gray-800 text-base">{item.factura}</Text>
                <Text className="flex-1 text-gray-800 text-base text-center">{item.Qtd}</Text>
                <Text className="flex-1 text-gray-800 text-base text-right">
                  R${(item.preco * item.Qtd).toFixed(2)}
                </Text>
              </View>
            ))}

            {/* Total */}
            <View className="flex-row justify-between py-4 border-t border-gray-300 mt-2">
              <Text className="text-gray-900 font-bold text-xl">Total:</Text>
              <Text className="text-gray-900 font-bold text-xl">R${total.toFixed(2)}</Text>
            </View>

            {/* Botão Confirmar Pedido */}
            <TouchableOpacity
              onPress={goNext}
              activeOpacity={0.85}
              className="mt-6 py-5 rounded-3xl bg-green-600 to-yellow-400 items-center shadow-md flex-row justify-center"
            >
              <Text className="text-white text-xl font-bold text-center">Confirmar Pedido</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Botão fixo Fechar Conta */}
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={goToMenu}
            activeOpacity={0.85}
            className="flex-row items-center justify-center w-4/5 py-5 rounded-3xl bg-[#d64343ff] from-red-600 to-yellow-500 shadow-lg"
          >
            <MaterialCommunityIcons name="logout" size={26} color="#fff" />
            <Text className="text-white text-xl font-bold ml-3 text-center">
              Fechar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
