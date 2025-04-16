import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function listEvents() {
    const [events, setEvents] = useState([]);
    const [alert, setAlert] = useState({
      //visibilidade (false = invisible omg is a metal gear solid snake reference????; true:visivel)
      open: false,
      //nivel do alerta(sucess,error, warning, etc)
      severity: "",
      message: "",
    });
    //função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };
  //fechar o alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const navigate = useNavigate();

  async function getEvento() {
    // Chamada da Api
    await api.getEvento().then(
      (response) => {
        console.log(response.data.events);
        setEvents(response.data.events);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }
  async function deleteEvents(id) {
    try {
      await api.deleteEvents(id);
      await getEvento();
      showAlert(
        "sucess",
        "Evento exculido com sucesso")
    } catch (error) {
      console.log("erro ao deletar Evento...", error);
      showAlert("error", error.response.data.error);
    }
  }
  const listUsers = events.map(() => {
    return (
      <TableRow key={events.id_evento}>
        <TableCell align="center">{events.nome}</TableCell>
        <TableCell align="center">{events.descricao}</TableCell>
        <TableCell align="center">{events.data_hora}</TableCell>
        <TableCell align="center">{events.local}</TableCell>
        <TableCell align="center">{events.fk_id_organizador}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteUser()}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  })
  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }
  useEffect(() => {
    // if (!localStorage.getItem("authenticated")) {
    //   navigate("/");
    // }
    getEvento();
  }, []);
  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      {events.length === 0 ? (
        <h1>Carregando Eventos</h1>
      ) : (
        <div>
          <h5>Lista de Eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "brown", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">nome</TableCell>
                  <TableCell align="center">descricao</TableCell>
                  <TableCell align="center">data e hora</TableCell>
                  <TableCell align="center">local</TableCell>
                  <TableCell align="center">Organizador</TableCell>
                  <TableCell align=" center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvents}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}
export default listEvents;


