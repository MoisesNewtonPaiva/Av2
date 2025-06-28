import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { Produto } from "../script/produtoService";

interface Props {
  produto: Produto;
  loading: boolean;
  onChange: (name: keyof Produto, value: string) => void;
  onSubmit: (data: Produto) => void;
  onCancel: () => void;
}

export default function FormProduto({
  produto,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const { control, handleSubmit, setValue } = useForm<{
    nome: string;
    preco: string;
  }>({
    defaultValues: {
      nome: produto.nome,
      preco: produto.preco ? String(produto.preco) : "",
    },
  });

  useEffect(() => {
    setValue("nome", produto.nome);
    setValue("preco", produto.preco ? String(produto.preco) : "");
  }, [produto, setValue]);

  return (
    <View style={{ width: "100%" }}>

      <Controller
        control={control}
        name="nome"
        rules={{ required: "O nome é obrigatório." }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <>
            <TextInput
              label="Nome"
              value={value}
              onChangeText={(text) => {
                onChangeField(text);
                onChange("nome", text);
              }}
              mode="outlined"
              style={{ marginBottom: 4, backgroundColor: "#fff" }}
              error={!!fieldState.error}
            />
            {fieldState.error?.message && (
              <Text style={{ color: "#d32f2f", marginBottom: 12 }}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />


      <Controller
        control={control}
        name="preco"
        rules={{
          required: "O preço é obrigatório.",
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Digite um valor válido com até 2 casas decimais.",
          },
        }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <>
            <TextInput
              label="Preço"
              value={value}
              onChangeText={(text) => {
                const sanitized = text.replace(",", ".").replace(/[^0-9.]/g, "");
                onChangeField(sanitized);
                onChange("preco", sanitized);
              }}
              mode="outlined"
              keyboardType="decimal-pad"
              style={{ marginBottom: 4, backgroundColor: "#fff" }}
              error={!!fieldState.error}
            />
            {fieldState.error?.message && (
              <Text style={{ color: "#d32f2f", marginBottom: 12 }}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />


      <Button
  mode="contained"
  onPress={handleSubmit(
    (data) => {
      const preco = parseFloat(data.preco);
      if (isNaN(preco) || preco <= 0) {
        alert("Preço inválido.");
        return;
      }
      onSubmit({ nome: data.nome, preco });
    },
    (errors) => {

      const mensagens = Object.values(errors).map((e) => e.message).filter(Boolean);
      if (mensagens.length > 0) {
        alert(mensagens[0]);
      }
    }
  )}
  loading={loading}
  style={{ marginBottom: 10, backgroundColor: "#1976d2" }}
  labelStyle={{ color: "#fff" }}
>
  Salvar
</Button>
      <Button
        mode="outlined"
        onPress={onCancel}
        labelStyle={{ color: "#1976d2" }}
      >
        Cancelar
      </Button>
    </View>
  );
}

