import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';
import { criarPedido } from '@/service/pedidos';

interface ProdutoCarrinho {
  produto: {
    id: number;
    nome: string;
    preco?: number;
  };
  qtd: number;
}

export default function Order() {
  const router = useRouter();
  const params = useLocalSearchParams<{ carrinho: string; nome?: string }>();
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.carrinho) {
      try {
        setCarrinho(JSON.parse(params.carrinho));
      } catch (err) {
        console.error('Erro ao parsear carrinho:', err);
      }
    }
  }, [params.carrinho]);

  const total = carrinho.reduce(
    (acc, item) => acc + (Number(item.produto.preco ?? 0) * item.qtd),
    0
  );

  const goToMenu = () => router.replace('./Menu');

  const goNext = async () => {
    if (carrinho.length === 0) return;

    setLoading(true);
    try {
      // Agora NÃO passa mais clienteId
      await criarPedido(carrinho);

      router.push('./PaymentSuccess');
    } catch (err) {
      console.error('Falha ao enviar pedido:', err);
      alert('Erro ao confirmar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (carrinho.length === 0) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center py-20 bg-[#F3F4F6] dark:bg-gray-900">
          <Animatable.View animation="bounceIn" duration={800}>
            <MaterialCommunityIcons name="cart-off" size={80} color="#FF6F00" />
          </Animatable.View>
          <Animatable.Text
            animation="fadeInLeft"
            duration={1000}
            className="text-orange-600 text-2xl font-bold mt-4 text-center"
          >
            Seu carrinho está vazio.
          </Animatable.Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-[#F3F4F6] dark:bg-gray-900">
        {/* Cabeçalho */}
        <View className="items-center py-10 px-4">
          <Animatable.Text
            animation="fadeInLeft"
            duration={800}
            className="text-5xl font-extrabold text-gray-900 dark:text-white text-center"
          >
            Seu Pedido
          </Animatable.Text>
          {params.nome && (
            <Text className="text-gray-600 dark:text-gray-400 text-xl mt-2">
              {params.nome}
            </Text>
          )}
        </View>

        {/* Lista de produtos */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160 }}
        >
          {carrinho.map((item, index) => {
            const precoUnit = Number(item.produto.preco ?? 0);
            return (
              <Animatable.View
                key={item.produto.id}
                animation="fadeInUp"
                delay={index * 100}
                className="flex-row items-center bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl mb-6 h-36"
              >
                <View className="flex-1 px-5 py-4 justify-between">
                  <Text className="text-gray-900 dark:text-white text-2xl font-bold">
                    {item.produto.nome}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400 text-xl mt-1">
                    Preço unitário: R$ {precoUnit.toFixed(2)}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400 text-xl mt-1">
                    Quantidade: {item.qtd}
                  </Text>
                  <Text className="text-gray-900 dark:text-white text-xl font-bold mt-2">
                    Subtotal: R$ {(precoUnit * item.qtd).toFixed(2)}
                  </Text>
                </View>
              </Animatable.View>
            );
          })}

          {/* Total */}
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            className="flex-row justify-between py-4 px-5 bg-white rounded-3xl shadow-md mt-2 mb-6"
          >
            <Text className="text-gray-900 font-bold text-2xl">Total:</Text>
            <Text className="text-gray-900 font-bold text-2xl">
              R$ {total.toFixed(2)}
            </Text>
          </Animatable.View>
        </ScrollView>

        <View className="absolute bottom-6 left-0 right-0 px-5">
          {/* Confirmar Pedido */}
          <TouchableOpacity
            onPress={goNext}
            className="flex-row items-center justify-center w-full py-4 rounded-3xl shadow-xl bg-green-600"
          >
            <MaterialCommunityIcons name="check-circle-outline" size={36} color="#fff" />
            <Text className="text-white text-2xl font-extrabold ml-4">
              Confirmar Pedido
            </Text>
          </TouchableOpacity>

          {/* Fechar Conta */}
          <TouchableOpacity
            onPress={goToMenu}
            className="flex-row items-center justify-center w-full py-5 mt-3 rounded-3xl shadow-xl bg-[#d64343ff] mb-4"
          >
            <MaterialCommunityIcons name="logout" size={32} color="#fff" />
            <Text className="text-white text-2xl font-extrabold ml-3 text-center">
              Fechar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
