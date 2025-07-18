import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import produtoService from "../services/produtoService";
import FormProduto from "../components/FormProduto";

export default function FormProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState({ nome: "", preco: "" });
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      produtoService.obter(id).then((data) => {
        setProduto({ nome: data.nome, preco: data.preco });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? value.replace(",", ".") : value,
    }));
  };

  const validar = () => {
    const novosErros = {};

    if (!produto.nome || produto.nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    const precoValido = parseFloat(produto.preco);
    const regexPreco = /^\d+(\.\d{1,2})?$/;

    if (!produto.preco) {
      novosErros.preco = "O preço é obrigatório.";
    } else if (isNaN(precoValido) || precoValido <= 0) {
      novosErros.preco = "O preço deve ser um número positivo.";
    } else if (!regexPreco.test(produto.preco)) {
      novosErros.preco = "O preço deve ter no máximo duas casas decimais.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    if (id) {
      await produtoService.atualizar(id, {
        nome: produto.nome,
        preco: parseFloat(produto.preco),
      });
    } else {
      await produtoService.criar({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
      });
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 400,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        color="primary"
        fontWeight="bold"
      >
        {id ? "Editar Produto" : "Novo Produto"}
      </Typography>
      <FormProduto
        produto={produto}
        loading={loading}
        erros={erros} 
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </Paper>
  );
}