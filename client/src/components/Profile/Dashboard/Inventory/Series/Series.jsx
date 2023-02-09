import { Icon } from "@iconify/react";
import {
  Button,
  IconButton,
  Input,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { addProduct } from "../../../../../Redux/Thunks/Products";
import Toast from "../../../../Toast/Toast";
import Sidebar from "../../Utils/global/Sidebar";
import { deleteSerie, getSeries, restoreSerie } from "./seriesContainer";

const Series = () => {
  const { productId } = useParams();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  const [series, setSeries] = useState(false);
  const [create, setCreate] = useState(false);
  const [serie, setSerie] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => await getSeries(productId, setSeries))();
  }, [productId]);
  const handleSerie = (e) => {
    setSerie(e.target.value);
  };
  return (
    <Box>
      {!open && <Navigate to="/dashboard/inventory" />}
      <Box display={"flex"}>
        <Sidebar />
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <Box
            width="70%"
            height="80%"
            overflow={"scroll"}
            sx={{
              background: theme[mode].cardSecondary,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "4px",
              padding: "20px",
            }}
          >
            <Button
              startIcon={<Icon icon="material-symbols:add-box-outline" />}
              onClick={() => setCreate(!create)}
            >
              Agregar serie
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>SERIE</TableCell>
                  <TableCell>ESTADO</TableCell>
                  <TableCell>ACCIONES</TableCell>
                </TableHead>
                <TableBody>
                  {series
                    ? series.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.serie}</TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>
                          <Box display="flex" justifyContent={"space-around"}>
                            <IconButton
                              onClick={async () => {
                                deleteSerie(s.id);
                                await getSeries(productId, setSeries);
                                await getSeries(productId, setSeries);
                              }}
                            >
                              <Icon icon="mdi:trash-can" />
                            </IconButton>
                            <IconButton
                              onClick={async () => {
                                restoreSerie(s.id);
                                await getSeries(productId, setSeries);
                                await getSeries(productId, setSeries);
                              }}
                            >
                              <Icon icon="material-symbols:restart-alt-rounded" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                    : null}
                  {create ? (
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="serie"
                          onChange={handleSerie}
                          value={serie}
                          defaultValue={serie}
                        ></Input>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="serie" disabled></Input>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={async () => {
                            if (serie !== "") {
                              console.log(productId);
                              await dispatch(addProduct(serie, productId));
                              await getSeries(productId, setSeries);

                              await getSeries(productId, setSeries);
                            } else {
                              Toast.fire({
                                icon: "warning",
                                title: "Debe llenar el campo: serie",
                              });
                            }
                            setSerie("");
                          }}
                        >
                          <Icon icon="material-symbols:check-circle" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default Series;
