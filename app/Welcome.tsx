import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Layout from './home/_layout';





export default function Welcome() {

 const estabelecimento = () => {
    const router = useRouter();
    router.push('./ChooseEstablishment'); 
 }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>BEM VINDO AO</Text>
        <Text style={styles.logo}>Great-X</Text>



        <TouchableOpacity
          onPress={estabelecimento}
          style={{ marginTop: 20, padding: 0, backgroundColor: '#007bff', borderRadius: 10, paddingHorizontal: 40, paddingVertical: 10 }} 
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Começar</Text>  
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 30, color: '#fff', fontFamily:'bold' },
  logo: { fontSize: 32, color: '#fff' },
});