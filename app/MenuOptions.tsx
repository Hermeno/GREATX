import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';

export default function MenuOption() {
  const router = useRouter();
  const goToMenu = () => router.push('./OpenTab');

  const menuItems = [
    { title: 'Porções', icon: 'tag', color: '#FF7A00', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' },
    { title: 'Pratos', icon: 'utensils', color: '#28a745', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb1d' },
    { title: 'Cervejas', icon: 'beer', color: '#007bff', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
    { title: 'Drinks', icon: 'cocktail', color: '#e83e8c', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2' },
    { title: 'Drinks / Álcool', icon: 'glass-martini-alt', color: '#6f42c1', image: 'https://images.unsplash.com/photo-1600891963925-41c24e6f0f46' },
  ];

  // Componente para animação de escala ao pressionar
  const ScaleButton = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => {
    const scale = new Animated.Value(1);

    const handlePressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={0.9}
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
          <Text className="text-4xl text-gray-900 font-extrabold text-center">Opções de Cardápio</Text>
          <Text className="text-gray-600 text-base mt-2 text-center">Escolha o que deseja pedir</Text>
        </View>

        {/* Conteúdo rolável */}
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <View className="space-y-6">
            {menuItems.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 120}
                className="shadow-lg rounded-3xl"
              >
                <ScaleButton onPress={goToMenu}>
                  <View className="flex-row items-center bg-white mt-2 rounded-3xl overflow-hidden shadow-sm">
                    {/* Imagem */}
                    <Image source={{ uri: item.image }} className="w-28 h-28" resizeMode="cover" />

                    {/* Texto + ícone */}
                    <View className="flex-1 px-4 py-4 justify-center">
                      <Text className="text-gray-900 text-xl font-bold">{item.title}</Text>
                      <Text className="text-gray-500 mt-1">Clique para ver mais</Text>
                    </View>

                    <View className="px-4">
                      <FontAwesome5 name={item.icon} size={26} color={item.color} />
                    </View>
                  </View>
                </ScaleButton>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>

        {/* Botão fixo de Fechar Conta */}
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={goToMenu}
            activeOpacity={0.9}
            className="flex-row items-center justify-center bg-[#D84315] w-4/5 py-4 rounded-3xl shadow-xl"
          >
            <MaterialCommunityIcons name="logout" size={24} color="#fff" />
            <Text className="text-white text-xl font-semibold ml-3">Fechar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
