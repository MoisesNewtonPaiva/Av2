import { TextField, Button, Stack, CircularProgress, Paper, Typography } from "@mui/material";

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
    <Paper
      elevation={10}
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        borderRadius: 5,
        backgroundColor: "#f7f7f7",
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)", 
        },
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        align="center"
        mb={3}
        fontWeight="bold"
        fontFamily="'Roboto', sans-serif"
      >
        {produto.id ? "Editar Produto" : "Novo Produto"}
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nome"
            name="nome"
            value={produto.nome}
            onChange={onChange}
            required
            error={!!erros.nome}
            helperText={erros.nome}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                padding: "12px",
              },
              "& .MuiFormLabel-root": {
                color: "#3f3f3f",
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                "&:hover fieldset": {
                  borderColor: "#4caf50", 
                },
              },
            }}
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
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                padding: "12px",
              },
              "& .MuiFormLabel-root": {
                color: "#3f3f3f",
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                "&:hover fieldset": {
                  borderColor: "#4caf50",
                },
              },
            }}
          />
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                width: "160px",
                borderRadius: "25px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#388e3c", 
                },
              }}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={onCancel}
              sx={{
                width: "160px",
                borderRadius: "25px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#d32f2f", 
                },
              }}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
