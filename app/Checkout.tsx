import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const data = [
  { id: '1', factura: 'frasjhavdhs', Qtd: 2, preco: 10.00 },
  { id: '2', factura: 'vbnvbvcv', Qtd: 1, preco: 5.00 },
  { id: '3', factura: 'bbbn.fxl;d', Qtd: 3, preco: 15.00 },
  { id: '4', factura: 'frsdfasf', Qtd: 1, preco: 20.00 },
];

export default function Welcome() {
  const router = useRouter();

  const handleClose = () => {
    router.push('./PaymentSuccess');
  };

  const total = data.reduce((acc, item) => acc + item.preco * item.Qtd, 0);

  return (
    <View className="flex-1 bg-[#001F3F]">
      {/* Cabeçalho */}
      <View className="justify-center items-center mt-16">
        <Text className="text-white text-4xl font-bold">Fechamento</Text>
      </View>

      {/* Card Branco */}
      <View className="flex-1 items-center mt-6">
        <View className="bg-white w-11/12 rounded-3xl p-6 shadow-lg">
          <Text className="text-2xl font-bold text-black text-center mb-4">Fernando</Text>

          <Text className="text-lg text-center text-black mb-2">Seu consumo foi</Text>
          <View className="h-[1px] bg-gray-400 mb-3" />

          {/* Tabela */}
          <View className="flex-row border-b border-gray-300 pb-2 mb-1">
            <Text className="flex-2 text-black font-bold text-base w-1/2">Factura</Text>
            <Text className="flex-1 text-black font-bold text-base w-1/4 text-center">Qtd</Text>
            <Text className="flex-1 text-black font-bold text-base w-1/4 text-center">Preço</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row py-1 border-b border-gray-200">
                <Text className="flex-2 text-black text-base w-1/2">{item.factura}</Text>
                <Text className="flex-1 text-black text-base w-1/4 text-center">{item.Qtd}</Text>
                <Text className="flex-1 text-black text-base w-1/4 text-center">
                  R${(item.preco * item.Qtd).toFixed(2)}
                </Text>
              </View>
            )}
          />

          {/* Total */}
          <TouchableOpacity
            onPress={handleClose}
            className="bg-[#00F7FF] py-3 rounded-2xl mt-6"
          >
            <Text className="text-center text-black text-xl font-bold">
              Total: R$ {total.toFixed(2)}
            </Text>
          </TouchableOpacity>

          <View className="h-[1px] bg-gray-400 my-4" />

          {/* Botão Fechar Conta */}
          <TouchableOpacity
            onPress={handleClose}
            className="bg-[#f46161] py-3 rounded-2xl mt-2"
          >
            <Text className="text-center text-white text-lg font-bold">✖ Fechar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
