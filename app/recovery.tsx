import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RecoverScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 bg-[#003761] px-8 justify-center">
      <StatusBar style="light" />

      {/* Ícone de segurança */}
      <View className="items-center mb-8">
        <FontAwesome name="lock" size={64} color="#00F7FF" />
      </View>

      {/* Título */}
      <Text className="text-white text-3xl font-bold mb-3 text-center">
        Recuperar Conta
      </Text>
      <Text className="text-white/70 text-base text-center mb-10">
        Digite o seu email para redefinir a senha.
      </Text>

      {/* Campo Email */}
      <View className="mb-8">
        <Text className="text-white mb-2 font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/30"
        />
      </View>

      {/* Botão Enviar */}
      <TouchableOpacity
        className="bg-[#FF00B6] py-3 rounded-full mb-6 shadow-md active:opacity-80"
        onPress={() => {
          if (!email) {
            alert('Por favor, insira o email.');
            return;
          }
          alert('Link de recuperação enviado para o seu email!');
        }}
      >
        <Text className="text-white text-lg font-semibold text-center">
          Enviar Link
        </Text>
      </TouchableOpacity>

      {/* Voltar ao login */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-white text-base">Lembrou da senha? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-[#00F7FF] font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
