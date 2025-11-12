import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';
import { getEstablishments } from '@/service/establishments';

const ScaleButton = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => {
  const scale = new Animated.Value(1);
  const handlePressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity activeOpacity={0.9} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ChooseEstablishment() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [establishments, setEstablishments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const data = await getEstablishments();
        setEstablishments(data);
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
  }, []);

  const goNext = () => {
    if (selectedId) {
      router.push({
        pathname: './NearBy',
        params: { id: selectedId.toString() },
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center bg-[#FFF8F0]">
          <ActivityIndicator size="large" color="#FF7A00" />
          <Text className="text-gray-500 mt-3">Carregando estabelecimentos...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="flex-1 px-4 pt-8 bg-[#FFF8F0]">
        {/* Cabeçalho */}
        <View className="items-center mb-6">
          <Text className="text-4xl font-extrabold text-gray-900 text-center">ESCOLHA</Text>
          <Text className="text-2xl text-gray-600 mt-1 text-center">O ESTABELECIMENTO</Text>
        </View>

        {/* Lista dinâmica */}
        <FlatList
          data={establishments}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
          renderItem={({ item, index }) => (
            <Animatable.View animation="fadeInUp" delay={index * 100}>
              <ScaleButton onPress={() => setSelectedId(item.id)}>
                <View
                  className={`flex-row items-center bg-white rounded-3xl p-4 mb-5 shadow-md border ${
                    selectedId === item.id ? 'border-[#FF7A00]' : 'border-gray-200'
                  }`}
                >
                  <View className="w-24 h-24 rounded-2xl overflow-hidden mr-4">
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

                  <View className="flex-1 justify-center">
                    <Text className="text-gray-900 text-xl font-semibold">{item.nome}</Text>
                    <Text className="text-gray-500 mt-1">{item.tipo || 'Tipo não informado'}</Text>
                    <Text className="text-gray-400 text-sm">{item.endereco || 'Endereço não disponível'}</Text>
                  </View>

                  <View
                    className={`p-3 rounded-full ${
                      selectedId === item.id ? 'bg-[#FF7A00]' : 'bg-gray-200'
                    }`}
                  >
                    <Feather name="arrow-right" size={20} color={selectedId === item.id ? '#fff' : '#666'} />
                  </View>
                </View>
              </ScaleButton>
            </Animatable.View>
          )}
        />

        {/* Botão Próximo */}
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={goNext}
            disabled={!selectedId}
            activeOpacity={0.9}
            className={`px-16 py-4 rounded-full ${
              selectedId ? 'bg-[#FF7A00]' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-bold text-lg text-center tracking-wide">Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
