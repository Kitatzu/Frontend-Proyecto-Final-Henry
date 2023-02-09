import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Pagination,
  Button,
  IconButton,
} from "@mui/material";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import {
  getUser,
  satusZero,
  getPageOne,
  getPageCero,
  DeleteUser,
  RestoreUser,
  rootUser,
} from "../../../../Redux/Thunks/getUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import NavBar from "../../../NavBar/NavBar";
import Sidebar from "../Utils/global/Sidebar";
import { Icon } from "@iconify/react";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);
  const { pages } = useSelector((store) => store.users);
  const [page, setPage] = useState(1);
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  useEffect(() => {
    dispatch(getUser());
    dispatch(getPageOne(0));
    dispatch(getPageOne(1));
    setPage(1);
    return () => {
      setPage(1);
      dispatch(getUser());
    };
  }, [dispatch]);

  const [status, setStatus] = useState("0");

  function handlerSelect(event) {
    setStatus(event.target.value);
    if (status === "0") {
      setPage(1);
      dispatch(satusZero());
      dispatch(getPageCero(0));
      dispatch(getPageCero(1));
    } else {
      setPage(1);
      dispatch(getUser());
      dispatch(getPageOne(0));
      dispatch(getPageOne(1));
    }
  }
  function paginated(e, value) {
    setPage(value);
    if (status === "0") {
      dispatch(getPageOne(value));
    } else {
      dispatch(getPageCero(value));
    }
  }
  function handlerAction(e) {
    if (status === "0") {
      setPage(1);
      dispatch(DeleteUser(e /* .target.value */));
      console.log(e /* .target.value */);
      dispatch(getUser());
      dispatch(getPageOne(0));
      dispatch(getPageOne(1));
    } else {
      setPage(1);
      dispatch(RestoreUser(e /* .target.value */));
      console.log(e /* .target.value */);
      dispatch(satusZero());
      dispatch(getPageCero(0));
      dispatch(getPageCero(1));
    }
  }
  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <Sidebar />
        <Box width={"100%"} padding="20px">
          <TableContainer sx={{ width: { xs: "100%" } }} component={Paper}>
            <Select value={status} onChange={(e) => handlerSelect(e)}>
              <MenuItem value={"0"}>Usuario activo</MenuItem>
              <MenuItem value={"1"}>Usuario eliminado</MenuItem>
            </Select>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/*  <TableCell align="center">UserName</TableCell> */}
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">rol</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users !== false
                  ? users.map(

                      (
                        e //si no hay datos ignora el map y manda vacio
                      ) => (
                        <TableRow
                          key={e.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {/*   <TableCell align="center">{e.userName}</TableCell> */}
                          <TableCell align="center">{e.email}</TableCell>
                          <TableCell align="center">{e.firstName}</TableCell>
                          <TableCell align="center">{e.lastName}</TableCell>
                          <TableCell align="center">{e.role.rol}</TableCell>
                          <TableCell align="center">
                            {" "}
                            <Button
                              key={e.id}
                              value={e.id}
                              onClick={() => handlerAction(e.id)}
                            >
                              <ChangeCircleRoundedIcon />
                            </Button>
                            <IconButton
                              onClick={() => dispatch(rootUser(e.id))}
                            >
                              <Icon icon="dashicons:admin-network" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )

                    )
                  
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            width={"100%"}
            display="flex"
            justifyContent={"center"}
            padding="20px"
          >
            {pages ? (
              <Pagination
                count={pages}
                page={page}
                color="secondary"
                onChange={paginated}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
