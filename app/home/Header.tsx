import { memo, useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function Header() {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <View className="flex-row justify-between items-center px-4" style={{ height: 60 }}>
      
      {/* Botão voltar */}
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={34} color="#1787dcff" />
      </TouchableOpacity>

      {/* Campo de busca */}
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        {searchVisible && (
          <TextInput
            placeholder="Pesquisar..."
            placeholderTextColor="#666"
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 12,
              height: 40,
              borderRadius: 10,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#1787dc33"
            }}
          />
        )}
      </View>

      {/* Search + Avatar */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Feather name="search" size={32} color="#1787dcff" />
        </TouchableOpacity>

        <View style={{ width: 10 }} />

        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={{ width: 36, height: 36, borderRadius: 18 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(Header);
