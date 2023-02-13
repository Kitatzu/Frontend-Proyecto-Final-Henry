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

import Pdf from "react-to-pdf";
import NavBar from "../../../NavBar/NavBar";
import { setRedir } from "../../../../Redux/Slices";
import { Navigate, useParams } from "react-router-dom";
import { getFacturaDetail } from "../../../../Redux/Thunks/factura";
import { socket } from "../../../../socket/socket";
import { Icon } from "@iconify/react";
import { Capacitor } from "@capacitor/core";
import { HTTP } from "@ionic-native/http";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import Toast from "../../../Toast/Toast";
import html2canvas from "html2canvas";
import axios from "axios";
import Global from "../../../../Global";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import footer from "../../../assets/footer.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
                    <Icon icon="uil:invoice" color={"#565656"} /> NOVA
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
          filename={
            "factura" +
            facturaDetail?.numberBill +
            facturaDetail?.paymentId +
            ".pdf"
          }
        >
          {({ toPdf, render }) => {
            console.log(render);
            console.log(toPdf);
            return (
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  const platform = Capacitor.getPlatform();
                  if (platform === "web") {
                    toPdf();
                  } else {
                    const filePath = `${File.dataDirectory}Factura-${facturaDetail?.paymentId}-${facturaDetail?.numberBill}.pdf`;
                    const A4_WIDTH = 595.28;
                    const A4_HEIGHT = 841.89;

                    html2canvas(ref.current, {
                      logging: false,
                      useCORS: true,
                      width: A4_WIDTH,
                      height: A4_HEIGHT,
                    }).then(async (canvas) => {
                      const img = canvas.toDataURL("image/png");
                      const base64Data = img.replace(
                        /^data:image\/(png|jpg);base64,/,
                        ""
                      );
                      const doc = {
                        content: [
                          {
                            image: "data:image/png;base64," + base64Data,
                            width: 750,
                            height: 900,
                          },
                        ],
                        pageSize: "A4",
                      };

                      const pdf = await pdfMake.createPdf(doc);
                      pdf.getBase64(async (encoded) => {
                        await pdf.getBlob((blob) => {
                          File.writeFile(
                            File.dataDirectory,
                            `Factura-${facturaDetail?.paymentId}-${facturaDetail?.numberBill}.pdf`,
                            blob,
                            { replace: true }
                          ).then(async (response) => {
                            console.log(response);

                            localStorage.setItem(
                              `${facturaDetail?.paymentId}-${facturaDetail?.numberBill}`,
                              filePath
                            );
                            Swal.fire({
                              icon: "success",
                              title: "Se guardo el archivo correctamente",
                            });
                            const openArch = localStorage.getItem(
                              `${facturaDetail?.paymentId}-${facturaDetail?.numberBill}`
                            );
                            if (!openArch) {
                              Toast.fire({
                                icon: "error",
                                title: "No se ha descargado el archivo!",
                              });
                            } else {
                              const mimeType = "application/pdf";
                              // Abrir archivo
                              await FileOpener.open(openArch, mimeType);
                            }
                          });
                        });
                      });
                    });
                  }
                }}
              >
                PDF
              </Button>
            );
          }}
        </Pdf>
      </Box>
    </>
  );
};
export default Factura;
