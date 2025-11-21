import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { listarPedidos } from "@/service/pedidos";

export default function VerPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarPedidos = async () => {
    try {
      setLoading(true);
      const data = await listarPedidos();
      setPedidos(data);
    } catch (e) {
      console.log("Erro ao carregar pedidos:", e);
      setErro("Não foi possível carregar os pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Carregando pedidos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{erro}</Text>
        <TouchableOpacity
          onPress={carregarPedidos}
          style={{ marginTop: 20, padding: 10, backgroundColor: "black", borderRadius: 6 }}
        >
          <Text style={{ color: "white" }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#f8f8f8" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
        Meus Pedidos
      </Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginBottom: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Pedido #{item.id}
            </Text>

            <Text>Status: {item.status}</Text>
            <Text>Total: {item.total} MT</Text>
            <Text>Data: {new Date(item.data_hora).toLocaleString()}</Text>

            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Itens:</Text>

            {item.itensPedido?.map((i, idx) => (
              <Text key={idx}>
                • Produto #{i.produto_id} — {i.quantidade} un — {i.preco_unitario} MT
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}
