import { Text, View, Image, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Bem-vindo ao CRUD Produtos</Text>
          <Text style={styles.subtitle}>
            Gerencie seus produtos de forma simples, prática e eficaz direto no
            seu celular.
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push("/produtos")}
            icon="format-list-bulleted"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Ir para Produtos
          </Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#eaf3fb",
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    transform: [{ scale: 1 }],
  },
  cardContent: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#1976d2",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
  },
});
