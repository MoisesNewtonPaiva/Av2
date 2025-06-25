import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { Card, Button, Text, FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import produtoService, { Produto } from "../../script/produtoService";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const lista = await produtoService.listar();
      setProdutos(lista);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir Produto", "Deseja realmente excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await produtoService.excluir(id);
          carregarProdutos();
        },
      },
    ]);
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f0f4f8" }}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        renderItem={({ item }) => (
          <Card
            style={{
              marginBottom: 12,
              backgroundColor: "#ffffff",
              borderRadius: 12,
              elevation: 3,
            }}
          >
            <Card.Title
              title={item.nome}
              subtitle={`R$ ${item.preco.toFixed(2)}`}
              titleStyle={{ fontWeight: "bold", fontSize: 16 }}
              subtitleStyle={{ color: "#444", marginTop: 4 }}
            />
            <Card.Actions style={{ justifyContent: "flex-end", paddingRight: 12 }}>
              <Button
                mode="outlined"
                onPress={() => router.replace(`/produtos/${item.id}`)}
                style={{
                  borderColor: "#1976d2",
                  marginRight: 8,
                }}
                textColor="#1976d2"
              >
                Editar
              </Button>
              <Button
                mode="outlined"
                textColor="#d32f2f"
                onPress={() => handleDelete(item.id!)}
                style={{ borderColor: "#d32f2f" }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
            Nenhum produto cadastrado.
          </Text>
        }
      />
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#1976d2",
        }}
        onPress={() => router.replace("/produtos/novo")}
        color="#fff"
      />
    </View>
  );
}
