import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import produtoService from "../services/produtoService";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const carregarProdutos = async () => {
    setLoading(true);
    setError(null);
    try {
      const lista = await produtoService.listar();
      setProdutos(lista);
    } catch (err) {
      setError("Erro ao carregar os produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await produtoService.excluir(id);
        carregarProdutos();
      } catch (err) {
        alert("Erro ao excluir produto. Tente novamente.");
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 3, background: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ m: 2, textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
        Lista de Produtos
      </Typography>
      
      {error && (
        <Typography variant="body2" color="error" align="center" sx={{ m: 2 }}>
          {error}
        </Typography>
      )}

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Preço</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.id}</TableCell>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/editar/${produto.id}`)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(produto.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8bbd0",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {produtos.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Nenhum produto cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
