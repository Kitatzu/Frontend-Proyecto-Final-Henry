import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getFactura } from "../../../Redux/Thunks/factura";
import { getFactura } from "../../../../Redux/Thunks/factura";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";
import AppBar from "../../../AppBar/AppBar";
import { Icon } from "@iconify/react";

export default function FacturaTable() {
  const { userId } = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { facturas } = useSelector((state) => state.factura);
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  useEffect(() => {
    dispatch(getFactura(userId));
    return () => {
      dispatch(getFactura(userId));
    };
  }, [dispatch, userId]);

  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box
          flexGrow={1}
          padding="20px"
          height="calc(100vh - 64px)"
          sx={{ background: theme[mode].primary }}
        >
          <Box width={"100%"} padding="20px">
            <Typography
              variant="h3"
              textAlign={"center"}
              sx={{ color: theme[mode].textPrimary }}
            >
              <Icon icon="uil:invoice" color={theme[mode].textPrimary} />{" "}
              Historial de facturas.
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">N° de Factura</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">N° de Pago</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facturas
                  ? facturas.map(
                      (
                        e //si no hay datos ignora el map y manda vacio
                      ) => (
                        <TableRow
                          key={e.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            <Link to={"invoice/" + e.id}>{e.numberBill}</Link>
                          </TableCell>
                          <TableCell align="center">{e.total}</TableCell>
                          <TableCell align="center">{e.paymentId}</TableCell>
                        </TableRow>
                      )
                    )
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <AppBar />
    </Box>
  );
}
