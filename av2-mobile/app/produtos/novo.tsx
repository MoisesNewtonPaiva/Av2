import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Text, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import produtoService, { Produto } from "../../script/produtoService";
import FormProduto from "../../components/FormProduto";

export default function NovoProduto() {
  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0 });
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<{ nome?: string; preco?: string }>({});
  const router = useRouter();

  const handleChange = (name: keyof Produto, value: string) => {
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? value.replace(",", ".") : value,
    }));
  };

  const validar = () => {
    const novosErros: { nome?: string; preco?: string } = {};

    if (!produto.nome || produto.nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 letras.";
      alert(novosErros.nome);
    }

    const preco = parseFloat(produto.preco.toString());
    if (!produto.preco) {
      novosErros.preco = "O preço é obrigatório.";
    } else if (isNaN(preco) || preco <= 0) {
      novosErros.preco = "Preço inválido.";
      alert(novosErros.preco);
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;

    setLoading(true);
    try {
      await produtoService.criar({
        nome: produto.nome,
        preco: parseFloat(produto.preco.toString()),
      });
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
      <View style={styles.outerCard}>
        <Text style={styles.pageTitle}>Novo Produto</Text>
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

const estilo = {
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25, 
  shadowRadius: 3.84,
  elevation: 5,
};
