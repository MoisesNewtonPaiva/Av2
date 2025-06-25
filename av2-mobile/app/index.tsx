import { Text, View, Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingTop: 40,
        backgroundColor: "#eaf3fb",
      }}
    >
      <Card
        style={{
          padding: 24,
          borderRadius: 20,
          backgroundColor: "#fff",
          elevation: 6,
          shadowColor: "#000",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
            }}
            style={{ width: 100, height: 100, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1976d2",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Bem-vindo ao CRUD Produtos
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#555",
              marginBottom: 24,
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            Gerencie seus produtos de forma simples, prática e eficaz direto no
            seu celular.
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push("/produtos")}
            icon="format-list-bulleted"
            style={{
              backgroundColor: "#1976d2",
              borderRadius: 10,
              width: "100%",
              paddingVertical: 8,
            }}
            labelStyle={{ fontSize: 16, color: "#fff" }}
          >
            Ir para Produtos
          </Button>
        </View>
      </Card>
    </View>
  );
}
