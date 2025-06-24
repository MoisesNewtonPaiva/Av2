import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function NavBar() {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2196f3", // Cor personalizada para o fundo
        borderRadius: 0,
        boxShadow: 2, // Adicionando sombra suave
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Stack direction="row" spacing={4}>
          <Button
            color={location.pathname === "/" ? "secondary" : "inherit"}
            variant={location.pathname === "/" ? "contained" : "text"}
            component={RouterLink}
            to="/"
            startIcon={<ListAltIcon />}
            sx={{
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              textTransform: "none", // Remover capitalização do texto
              "&:hover": {
                backgroundColor: "#1976d2", // Cor no hover
              },
            }}
          >
            Produtos
          </Button>
          <Button
            color={location.pathname === "/novo" ? "secondary" : "inherit"}
            variant={location.pathname === "/novo" ? "contained" : "text"}
            component={RouterLink}
            to="/novo"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              fontWeight: location.pathname === "/novo" ? "bold" : "normal",
              textTransform: "none", // Remover capitalização do texto
              "&:hover": {
                backgroundColor: "#1976d2", // Cor no hover
              },
            }}
          >
            Novo Produto
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
