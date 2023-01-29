import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import NavBar from "../../NavBar/NavBar";
import { setRedir } from "../../../Redux/Slices";
import { Navigate } from "react-router-dom";
const Factura = () => {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  const products = useSelector((store) => store.factura.facturaDetail.products);
  const { redir } = useSelector((store) => store.factura);
  const { total, numberBill, paymentId } = useSelector(
    (store) => store.factura.facturaDetail
  );
  const ref = React.createRef();
  return (
    <>
      <NavBar />
      {!redir ? <Navigate to="/cart" /> : null}
      <Box
        sx={{
          padding: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box ref={ref} width="800px">
          <Box sx={{ padding: "20px" }}>
            <Card variant={"outlined"}>
              <CardContent>
                <Box>
                  <Typography>BoxTech</Typography>
                </Box>
                <Box padding={"0 10px"}>
                  <Typography sx={{ color: theme[mode].textSecond }}>
                    Factura N° 000000-0{numberBill}
                  </Typography>
                </Box>
                <Box padding={"0 10px"}>
                  <Typography sx={{ color: theme[mode].textSecond }}>
                    Numero de orden {paymentId}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <TableContainer component={Paper} sx={{ fontSize: "14px" }}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  ? products.map((product) => (
                      <TableRow>
                        <TableCell>{product.product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          {product.product.price * product.quantity}
                        </TableCell>
                      </TableRow>
                    ))
                  : "No hay productos!"}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{total}$</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        gap={"20px"}
        padding="10px 0"
      >
        <Button variant={"outlined"} onClick={() => dispatch(setRedir(false))}>
          Volver al carrito
        </Button>
        <Pdf targetRef={ref} filename={"factura" + numberBill + ".pdf"}>
          {({ toPdf }) => (
            <Button variant="contained" color="secondary" onClick={toPdf}>
              PDF
            </Button>
          )}
        </Pdf>
      </Box>
    </>
  );
};
export default Factura;
