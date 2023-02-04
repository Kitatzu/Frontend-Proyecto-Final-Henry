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
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFactura } from "../../../Redux/Thunks/factura";
import { Link } from "react-router-dom";


export default function FacturaTable() {
  const { userId } = JSON.parse(localStorage.getItem("token"))
  const dispatch = useDispatch();
  const { facturas } = useSelector((state) => state.factura);
  console.log(facturas)
  useEffect(() => {
    dispatch(getFactura(userId));
    return () => {
      dispatch(getFactura(userId));
    }
  }, [dispatch]);

  const [status, setStatus] = useState("0");
  ;

  // function handlerSelect(event){
  // setStatus(event.target.value)
  // if(status==="0"){
  //   dispatch(satusZero());
  //   console.log(status)
  // }else{
  //   dispatch(getFactura());
  //   console.log(status)
  // }
  // /* setAux("") */
  // }
  return (
    <TableContainer component={Paper}>
      {/* <Select value={status}  onChange={e=>handlerSelect(e)}>
         <MenuItem value={"0"}>Usuario activo</MenuItem>
         <MenuItem value={"1"}>Usuario eliminado</MenuItem>
      </Select> */}
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/*  <TableCell align="center">UserName</TableCell> */}
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/*   <TableCell align="center">{e.userName}</TableCell> */}

                  <TableCell align="center"><Link to={"/factura/" + e.id}>{e.numberBill}</Link></TableCell>
                  <TableCell align="center">{e.total}</TableCell>
                  <TableCell align="center">{e.paymentId}</TableCell>
                </TableRow>
              )
            )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
