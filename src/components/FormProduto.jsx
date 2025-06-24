import { TextField, Button, Stack, CircularProgress } from "@mui/material";

export default function FormProduto({
  produto,
  loading,
  erros = {},
  onChange,
  onSubmit,
  onCancel,
}) {
  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          name="nome"
          value={produto.nome}
          onChange={onChange}
          required
          error={!!erros.nome}
          helperText={erros.nome}
        />
        <TextField
          label="Preço"
          name="preco"
          type="number"
          value={produto.preco}
          onChange={onChange}
          required
          inputProps={{ step: "0.01", min: "0" }}
          error={!!erros.preco}
          helperText={erros.preco}
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    </form>
  );
}
