import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import Layout from './home/_template';
import { getHistoricoBeneficios } from '@/service/historico'; // 🔹 você criará esse serviço

export default function Historico() {
  const [historico, setHistorico] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const data = await getHistoricoBeneficios();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, []);

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center bg-[#FFF8F0]">
          <ActivityIndicator size="large" color="#FF7A00" />
          <Text className="text-gray-500 mt-3">Carregando seu histórico...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-[#FFF8F0] px-5 pt-10">
        {/* Cabeçalho */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-extrabold text-gray-900 text-center">
            Meu <Text className="text-[#FF7A00]">Histórico</Text>
          </Text>
          <Text className="text-gray-600 mt-2 text-lg text-center">
            Veja os últimos estabelecimentos visitados 🍻
          </Text>
        </View>

        {/* Lista de histórico */}
        {historico.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Feather name="inbox" size={60} color="#ccc" />
            <Text className="text-gray-400 mt-3 text-lg">Nenhum histórico encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={historico}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item, index }) => (
              <Animatable.View animation="fadeInUp" delay={index * 100}>
                <View className="flex-row items-center bg-white rounded-3xl p-4 mb-5 shadow-md border border-gray-200">
                  {/* Foto do estabelecimento */}
                  <View className="w-20 h-20 rounded-2xl overflow-hidden mr-4">
                    <Image
                      source={{
                        uri: item.foto
                          ? item.foto.startsWith('http')
                            ? item.foto
                            : `https://seu-servidor.com/uploads/${item.foto}`
                          : 'https://via.placeholder.com/150',
                      }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Informações */}
                  <View className="flex-1">
                    <Text className="text-gray-900 text-lg font-semibold">{item.nome}</Text>
                    <Text className="text-gray-500">{item.tipo || 'Tipo não informado'}</Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      📅 {item.data_visita || 'Data não disponível'}
                    </Text>
                  </View>

                  <View className="p-2 rounded-full bg-orange-100">
                    <Feather name="clock" size={20} color="#FF7A00" />
                  </View>
                </View>
              </Animatable.View>
            )}
          />
        )}
      </View>
    </Layout>
  );
}
