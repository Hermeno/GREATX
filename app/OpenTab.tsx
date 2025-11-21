import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';
import { getProdutosByCategoria } from '@/service/produtos';

interface Produto {
  id: number;
  nome: string;
  preco?: number;
  imagem: string;
}

export default function OpenTab() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; nome: string }>();
  const categoriaId = Number(params.id);
  const categoriaNome = params.nome;

  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<{ produto: Produto; qtd: number }[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      if (!categoriaId) return;
      try {
        const data = await getProdutosByCategoria(categoriaId);
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [categoriaId]);

  const adicionarAoCarrinho = (produto: Produto) => {
    if (!produto.preco) {
      console.warn('Produto sem preço:', produto);
      return;
    }

    setCarrinho((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, qtd: item.qtd + 1 }
            : item
        );
      } else {
        return [...prev, { produto, qtd: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produto: Produto) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.produto.id === produto.id
            ? { ...item, qtd: item.qtd - 1 }
            : item
        )
        .filter((item) => item.qtd > 0)
    );
  };

  const qtdNoCarrinho = (produtoId: number) => {
    const item = carrinho.find((i) => i.produto.id === produtoId);
    return item ? item.qtd : 0;
  };

  const irParaOrder = () => {
    router.push({
      pathname: './Order',
      params: { carrinho: JSON.stringify(carrinho) },
    });
  };

  if (loading) return (
    <Layout>
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF6F00" />
        <Animatable.Text animation="fadeInLeft" duration={1000} className="text-orange-600 text-xl mt-4 font-bold text-center">
          Aguarde um instante, carregando os produtos...
        </Animatable.Text>
      </View>
    </Layout>
  );

  if (produtos.length === 0) return (
    <Layout>
      <View className="flex-1 justify-center items-center py-20">
        <Animatable.View animation="bounceIn" duration={800}>
          <MaterialCommunityIcons name="alert-circle-outline" size={80} color="#FF6F00" />
        </Animatable.View>
        <Animatable.Text animation="fadeInLeft" duration={1200} className="text-orange-600 text-xl mt-4 font-bold text-center">
          Nenhum produto disponível no momento.
        </Animatable.Text>
      </View>
    </Layout>
  );

  return (
    <Layout>
      <View className="flex-1 bg-[#F3F4F6] dark:bg-gray-900">
        {/* Título */}
        <View className="items-center py-10 px-4">
          <Animatable.Text animation="fadeInLeft" duration={800} className="text-5xl font-extrabold text-gray-900 dark:text-white text-center">
            {categoriaNome}
          </Animatable.Text>
        </View>

        {/* Lista de produtos */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}>
          {produtos.map((item, index) => (
            <Animatable.View key={item.id} animation="fadeInUp" delay={index * 100} className="flex-row items-center bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl mb-6 h-36">
              <Image source={{ uri: item.imagem }} className="w-36 h-full rounded-l-3xl" resizeMode="cover" />
              <View className="flex-1 px-5 py-4 justify-between">
                <Text className="text-gray-900 dark:text-white text-2xl font-bold">{item.nome}</Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1 text-xl">R$ {Number(item.preco ?? 0).toFixed(2)}</Text>

                {/* Quantidade */}
                <View className="flex-row items-center mt-3 space-x-4">
                  <TouchableOpacity onPress={() => removerDoCarrinho(item)} className="bg-gray-300 rounded-full w-12 h-12 items-center justify-center">
                    <Animatable.Text animation="pulse" iterationCount={1} duration={200} className="text-2xl font-bold">-</Animatable.Text>
                  </TouchableOpacity>
                  <Animatable.Text animation="pulse" duration={200} iterationCount={1} className="text-gray-800 text-2xl font-bold">
                    {qtdNoCarrinho(item.id)}
                  </Animatable.Text>
                  <TouchableOpacity onPress={() => adicionarAoCarrinho(item)} className="bg-gray-300 rounded-full w-12 h-12 items-center justify-center">
                    <Animatable.Text animation="pulse" iterationCount={1} duration={200} className="text-2xl font-bold">+</Animatable.Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>

        {/* Footer com botão do carrinho */}
        <Animatable.View animation="bounceInUp" duration={800} className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={irParaOrder}
            disabled={carrinho.length === 0}
            className={`flex-row items-center justify-center w-10/12 py-6 rounded-3xl shadow-xl ${
              carrinho.length > 0 ? 'bg-[#D84315]' : 'bg-gray-400'
            }`}
          >
            <MaterialCommunityIcons name="cart-check" size={28} color="#fff" />
            <Text className="text-white text-2xl font-extrabold ml-4">Ir para o Carrinho ({carrinho.length})</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Layout>
  );
}
