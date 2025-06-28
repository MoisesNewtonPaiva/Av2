import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Card } from "react-native-paper";
import produtoService, { Produto } from "../../script/produtoService";
import FormProduto from "../../components/FormProduto";

export default function EditarProduto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      produtoService.obter(Number(id)).then((data) => {
        setProduto({ nome: data.nome, preco: data.preco });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (name: keyof Produto, value: string) => {
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? value : value,
    }));
  };

  const handleSubmit = async (data?: any) => {
    const nome = data?.nome ?? produto.nome;
    const precoStr = data?.preco ?? produto.preco;
    const preco =
      typeof precoStr === "string" ? parseFloat(precoStr) : precoStr;

    if (!nome || !preco) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      await produtoService.atualizar(Number(id), { nome, preco });
      router.replace("/produtos");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.outerCard}>
        <Text style={styles.pageTitle}>Editar Produto</Text>
        <Card style={styles.card} mode="elevated">
          <Text style={styles.title}>Editar Produto</Text>
          <FormProduto
            produto={produto}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              if (router.canGoBack?.()) {
                router.back();
              } else {
                router.replace("/produtos");
              }
            }}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
    justifyContent: "center",
  },
  outerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    marginBottom: 16,
  },
});
