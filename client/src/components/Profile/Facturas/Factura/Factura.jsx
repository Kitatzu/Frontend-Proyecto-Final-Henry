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
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import NavBar from "../../../NavBar/NavBar";
import { setRedir } from "../../../../Redux/Slices";
import { Navigate, useParams } from "react-router-dom";
import { getFacturaDetail } from "../../../../Redux/Thunks/factura";
import io from "socket.io-client";
import Global from "../../../../Global";
const socket = io(Global.URL);
const Factura = () => {
  const { facturaId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFacturaDetail(facturaId));
    socket.emit("sendDataSold");
    socket.emit("sendProductSold");
  }, [facturaId, dispatch]);
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  const products = useSelector(
    (store) => store.factura.facturaDetail?.products
  );
  const { redir } = useSelector((store) => store.factura);
  // const { total, numberBill, paymentId } = useSelector(
  //   (store) => store.factura.facturaDetail
  // );
  const { facturaDetail } = useSelector((store) => store.factura);
  const { isLog } = useSelector((store) => store.users);
  console.log(facturaDetail);
  const ref = React.createRef();

  return (
    <>
      <NavBar />
      {!isLog && <Navigate to="/home" />}
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
                <Box
                  display={"flex"}
                  justifyContent="flex-start"
                  alignItems={"center"}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "30px", sm: "60px" },
                      fontWeight: 800,
                      color: "#308FFD",
                    }}
                  >
                    NOVA
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "30px", sm: "60px" } }}>
                    Tech Power
                  </Typography>
                </Box>
                <Box padding={"0 10px"}>
                  <Typography sx={{ color: theme[mode].textSecond }}>
                    Factura N° 000000-0{facturaDetail?.numberBill}
                  </Typography>
                </Box>
                <Box padding={"0 10px"}>
                  <Typography sx={{ color: theme[mode].textSecond }}>
                    Numero de orden {facturaDetail?.paymentId}
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
                  <TableCell>{facturaDetail?.total}$</TableCell>
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
        <Pdf
          targetRef={ref}
          filename={"factura" + facturaDetail?.numberBill + ".pdf"}
        >
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
