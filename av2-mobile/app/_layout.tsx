import { Stack } from "expo-router";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { useEffect } from "react";
import { StatusBar, Platform } from "react-native";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f0f4f8",
    surface: "#ffffff",
    primary: "#1976d2",
    accent: "#f50057",
    text: "#1e1e1e",
    onSurface: "#1e1e1e",
    onBackground: "#1e1e1e",
    placeholder: "#888",
  },
};

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#1976d2");
    }
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <PaperProvider theme={customTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
              backgroundColor: customTheme.colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          contentStyle: {
            backgroundColor: customTheme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="produtos/index"
          options={{ title: "Lista de Produtos" }}
        />
        <Stack.Screen
          name="produtos/novo"
          options={{ title: "Novo Produto" }}
        />
        <Stack.Screen
          name="produtos/[id]"
          options={{ title: "Editar Produto" }}
        />
      </Stack>
    </PaperProvider>
  );
}
