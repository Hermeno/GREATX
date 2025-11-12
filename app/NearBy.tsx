import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Layout from './home/_template';
import { chooseEstablishmentById } from '@/service/establishments';

export default function WelcomeBarX() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // 🔹 Recebe o ID do estabelecimento

  console.log('ID do estabelecimento recebido:', id);
  const [bar, setBar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const goNext = () => router.push('./Menu'); // Página seguinte

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const estabelecimentoId = Array.isArray(id) ? id[0] : id;
        if (!estabelecimentoId) return;
        const data = await chooseEstablishmentById({ id: estabelecimentoId });
        setBar(data);
      } catch (error) {
        console.error('Erro ao buscar o estabelecimento:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBar();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center bg-[#f8f9fa]">
          <ActivityIndicator size="large" color="#f97316" />
          <Text className="text-gray-600 mt-3">Carregando informações do bar...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-[#f8f9fa] px-6 pt-20 items-center justify-between">
        {/* Parte superior: ícone e boas-vindas */}
        <View className="items-center mt-8">
          <View className="bg-orange-100 rounded-full p-6 mb-6 shadow-sm">
            <MaterialCommunityIcons name="beer" size={70} color="#f97316" />
          </View>

          <Text className="text-4xl font-extrabold text-gray-900 mb-3 text-center">
            Bem-vindo ao{' '}
            <Text className="text-orange-500">
              {bar?.nome || 'Bar X'}
            </Text>
            !
          </Text>

          <Text className="text-gray-600 text-lg text-center px-4">
            Estamos felizes em te receber! 🍻  
            Aproveite o melhor atendimento e uma experiência única.
          </Text>
        </View>

        {/* Imagem decorativa opcional */}
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3063/3063708.png' }}
          className="w-52 h-52 mt-10"
          resizeMode="contain"
        />

        {/* Botão inferior */}
        <TouchableOpacity
          onPress={goNext}
          activeOpacity={0.85}
          className="w-full mb-12 bg-orange-500 py-4 rounded-3xl shadow-md flex-row items-center justify-center"
        >
          <MaterialCommunityIcons name="arrow-right-circle" size={26} color="white" />
          <Text className="text-white text-lg font-semibold ml-3 tracking-wide">
            Vamos abrir sua comanda 🍺
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
