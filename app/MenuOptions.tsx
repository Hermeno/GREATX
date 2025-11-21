import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, ActivityIndicator, Animated } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Layout from "./home/_template";
import { getCategorias } from "@/service/categorias";

interface Categoria {
  id: number;
  nome: string;
  imagem?: string;
}

export default function MenuOption() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Navega para OpenTab enviando id e nome via query params
  const goToMenu = (categoria: Categoria) => {
    router.push(
      `./OpenTab?id=${categoria.id}&nome=${encodeURIComponent(categoria.nome)}`
    );
  };

  const ScaleButton = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => {
    const scale = new Animated.Value(1);
    const handlePressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading)
    return (
      <Layout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6F00" />
        </View>
      </Layout>
    );

  return (
    <Layout>
      <View className="flex-1 px-4 pt-12 pb-24 bg-[#FFF8F0]">
        <View className="items-center mb-8">
          <Text className="text-4xl text-gray-900 font-extrabold text-center">Opções de Cardápio</Text>
          <Text className="text-gray-600 text-base mt-2 text-center">Escolha o que deseja pedir</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <View className="space-y-6">
            {categorias.map((item, index) => (
              <Animatable.View key={item.id} animation="fadeInUp" delay={index * 120} className="shadow-lg rounded-3xl">
                <ScaleButton onPress={() => goToMenu(item)}>
                  <View className="flex-row items-center bg-white mt-2 rounded-3xl overflow-hidden shadow-sm">
                    <Image
                      source={{ uri: item.imagem || "https://via.placeholder.com/100" }}
                      className="w-28 h-28"
                      resizeMode="cover"
                    />
                    <View className="flex-1 px-4 py-4 justify-center">
                      <Text className="text-gray-900 text-xl font-bold">{item.nome}</Text>
                      <Text className="text-gray-500 mt-1">Clique para ver mais</Text>
                    </View>
                    <View className="px-4">
                      <FontAwesome5 name="utensils" size={26} color="#FF7A00" />
                    </View>
                  </View>
                </ScaleButton>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>

        <View className="absolute bottom-6 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={() => router.push("./FecharConta")}
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
