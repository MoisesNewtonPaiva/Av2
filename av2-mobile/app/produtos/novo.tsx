import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import produtoService, { Produto } from "../../script/produtoService";
import FormProduto from "../../components/FormProduto";

export default function NovoProduto() {
  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name: keyof Produto, value: string) => {
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data?: any) => {
    const nome = data?.nome ?? produto.nome;
    const precoStr = data?.preco ?? produto.preco;
    const preco =
      typeof precoStr === "string" ? parseFloat(precoStr) : precoStr;

    if (!nome || isNaN(preco) || preco <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    setLoading(true);
    try {
      await produtoService.criar({ nome, preco });
      router.replace("/produtos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Card style={styles.card} mode="elevated">
        <Text style={styles.title}>Novo Produto</Text>
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
  card: {
    borderRadius: 16,
    padding: 24,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    marginBottom: 20,
  },
});

