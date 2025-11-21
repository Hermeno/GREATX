import { Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Layout from './home/_template';
import { getCategorias } from "@/service/categorias";

export default function Promocao() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    drink: <Entypo name="drink" size={26} color="#FF7A00" />,
    food: <MaterialCommunityIcons name="food" size={26} color="#FF7A00" />,
    hamburger: <FontAwesome5 name="hamburger" size={26} color="#FF7A00" />,
    cake: <Entypo name="cake" size={26} color="#FF7A00" />,
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

const goTo = (categoria: Categoria) => {
  router.push(
    `./OpenTab?id=${categoria.id}&nome=${encodeURIComponent(categoria.nome)}`
  );
};


  const ScaleButton = ({ onPress, children }) => {
    const scale = new Animated.Value(1);

    const handlePressIn = () =>
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();

    const handlePressOut = () =>
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

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

        {/* Loading */}
        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FF7A00" />
          </View>
        )}

        {/* Lista */}
        {!loading && (
          <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
            <View className="space-y-6">
              {categorias.map((cat, index) => (
                <Animatable.View
                  key={cat.id}
                  animation="fadeInUp"
                  delay={index * 120}
                  className="shadow-lg rounded-3xl"
                >
                  <ScaleButton onPress={() => goTo(cat)}>

                    <View className="flex-row items-center bg-white rounded-3xl mt-2 overflow-hidden">
                      <Image
                        source={{ uri: cat.imagem }}
                        className="w-28 h-28"
                        resizeMode="cover"
                      />

                      <View className="flex-1 px-4 py-4 justify-center">
                        <Text className="text-gray-900 text-xl font-bold">
                          {cat.nome}
                        </Text>
                        <Text className="text-gray-500 mt-1">
                          Clique para ver promoções
                        </Text>
                      </View>

                      <View className="px-4">
                        {iconMap[cat.icon] ?? (
                          <MaterialCommunityIcons
                            name="tag"
                            size={26}
                            color="#FF7A00"
                          />
                        )}
                      </View>
                    </View>
                  </ScaleButton>
                </Animatable.View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </Layout>
  );
}
