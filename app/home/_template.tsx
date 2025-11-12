import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <View className="flex-1 bg-[#f7f7f7]">
      {/* Header fixo */}
      <View className="flex-row justify-between items-center px-4" style={{ height: 60 }}>
        <TouchableOpacity>
          <Feather name="menu" size={40} color="#1787dcff" />
        </TouchableOpacity>

        {/* Logo central */}
        {/* <Image source={require('../assets/logo.png')} className="w-10 h-10 rounded-full" /> */}

        <TouchableOpacity>
          <Feather name="search" size={40} color="#1787dcff" />
        </TouchableOpacity>
      </View>

      {/* Aqui vai o conteúdo passado como children */}
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
}
