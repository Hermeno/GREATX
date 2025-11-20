import { Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';

export default function Promocao() {
  const router = useRouter();

  




const promocaoItems = [
  {
    title: 'Bebidas',
    icon: <Entypo name="drink" size={26} color="#FF7A00" />,
    image: require('../../assets/pic/bbbbb.jpg'),
    link: './Bebidas',
  },
  {
    title: 'Refrigerantes',
    icon: <MaterialCommunityIcons name="food" size={26} color="#FF7A00" />,
    image: require('../../assets/pic/bb.jpg'),
    link: './Refrigerantes',
  },

  {
    title: 'Prato',
    icon: <FontAwesome5 name="hamburger" size={26} color="#FF7A00" />,
    image: require('../../assets/pic/ccc.jpg'),
    link: './Pratos',
  },
  {
    title: 'Sobremesas',
    icon: <Entypo name="cake" size={26} color="#FF7A00" />,
    image: require('../../assets/pic/e.jpg'),
    link: './Sobremesas',
  },
];







  const goTo = (link: string) => router.push(link);

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
            Promoções 🍔🥤
          </Text>
          <Text className="text-lg text-gray-600 mt-2 text-center">
            Escolha uma categoria para ver as promoções
          </Text>
        </View>

        {/* Conteúdo rolável */}
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          <View className="space-y-6">
            {promocaoItems.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 120}
                className="shadow-lg rounded-3xl"
              >
                <ScaleButton onPress={() => goTo(item.link)}>
                  <View className="flex-row items-center bg-white rounded-3xl mt-2 overflow-hidden">
                    <Image
                      source={{ uri: item.image }}
                      className="w-28 h-28"
                      resizeMode="cover"
                    />
                    <View className="flex-1 px-4 py-4 justify-center">
                      <Text className="text-gray-900 text-xl font-bold">{item.title}</Text>
                      <Text className="text-gray-500 mt-1">Clique para ver promoções</Text>
                    </View>
                    <View className="px-4">{item.icon}</View>
                  </View>
                </ScaleButton>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
