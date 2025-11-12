import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';

export default function Welcome() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Ver Cardápio',
      icon: <Entypo name="list" size={26} color="#FF7A00" />,
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      link: './MenuOptions',
    },
    {
      title: '% Promoções',
      icon: <FontAwesome name="percent" size={26} color="#FF7A00" />,
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb1d',
      link: './MenuOptions',
    },
    {
      title: 'Meu Histórico',
      icon: <MaterialCommunityIcons name="history" size={26} color="#FF7A00" />,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      link: './MenuOptions',
    },
  ];

  const goTo = (link: string) => router.push(link);

  // Animação touch
  const ScaleButton = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => {
    const scale = new Animated.Value(1);

    const handlePressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Layout>
      <View className="flex-1 px-4 pt-12 pb-24 bg-[#FFF8F0]">
        {/* Cabeçalho */}
        <View className="items-center mb-8">
          <Text className="text-4xl text-gray-900 font-extrabold text-center">
            Olá, Fernando 👋
          </Text>
          <Text className="text-lg text-gray-600 mt-2 text-center">
            Escolha uma opção para começar
          </Text>
        </View>

        {/* Conteúdo rolável */}
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          <View className="space-y-6">
            {menuItems.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 120}
                className="shadow-lg rounded-3xl"
              >
                <ScaleButton onPress={() => goTo(item.link)}>
                  <View className="flex-row items-center bg-white rounded-3xl mt-2 overflow-hidden">
                    {/* Imagem */}
                    <Image
                      source={{ uri: item.image }}
                      className="w-28 h-28"
                      resizeMode="cover"
                    />

                    {/* Texto + ícone */}
                    <View className="flex-1 px-4 py-4 justify-center">
                      <Text className="text-gray-900 text-xl font-bold">{item.title}</Text>
                      <Text className="text-gray-500 mt-1">Clique para ver mais</Text>
                    </View>

                    <View className="px-4">{item.icon}</View>
                  </View>
                </ScaleButton>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>

        {/* Botão fixo de sair */}
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={() => goTo('./MenuOptions')}
            activeOpacity={0.9}
            className="flex-row items-center justify-center bg-[#D84315] w-4/5 py-4 rounded-3xl shadow-xl"
          >
            <MaterialCommunityIcons name="logout" size={24} color="#fff" />
            <Text className="text-white text-lg font-semibold tracking-wide ml-3">
              Fechar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
