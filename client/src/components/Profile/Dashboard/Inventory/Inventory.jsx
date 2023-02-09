import { Icon } from "@iconify/react";
import {
  Alert,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Modal,
  List,
  ListItem,
  ListItemButton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPage,
  getProducts,
  deletedProducts,
  pageStatusCero,
} from "../../../../Redux/Thunks/Products";
import NavBar from "../../../NavBar/NavBar";
import Sidebar from "../Utils/global/Sidebar";
import Series from "./Series/Series.jsx";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { pages } = useSelector((store) => store.products);
  const [page, setPage] = useState(1);
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  /*  console.log(products); */
  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
    setPage(1);
    return () => {
      setPage(1);
      dispatch(getPage(1));
      console.log("unmonted inventory");
    };
  }, [dispatch]);
  const [status, setStatus] = useState("1");

  function handlerSelect(event) {
    setStatus(event.target.value);
    if (status === "1") {
      setPage(1);
      dispatch(deletedProducts());
      dispatch(pageStatusCero(0));
      dispatch(pageStatusCero(1));
      /*  console.log(status) */
    } else {
      setPage(1);
      dispatch(getProducts());
      dispatch(getPage(0));
      dispatch(getPage(1));
      /*  console.log(status) */
    }
  }
  function paginated(e, value) {
    setPage(value);
    /*  console.log(e)
    console.log(aux) */
    if (status === "1") {
      dispatch(getPage(value));
      console.log(page);
    } else {
      dispatch(pageStatusCero(value));

      console.log(page);
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <Sidebar />
        <Box
          padding="20px"
          flexGrow={1}
          minHeight="1000px"
          sx={{ background: theme[mode].primary }}
        >
          <Box padding="20px 0">
            <Select
              value={status}
              onChange={(e) => handlerSelect(e)}
              sx={{
                color: theme[mode].textPrimary,
                background: "rgba(255,255,255,.2)",
              }}
            >
              <MenuItem value={"1"}>Producto activo</MenuItem>
              <MenuItem value={"0"}>Producto eliminado</MenuItem>
            </Select>
          </Box>
          <TableContainer sx={{ width: { xs: "100%" } }} component={Paper}>
            <Table>
              <TableHead>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Categorias</TableCell>
                <TableCell>Acciones</TableCell>
              </TableHead>

              <TableBody>
                {products?.length > 0 ? (
                  products.map((prods) => (
                    <TableRow key={prods.id}>
                      <TableCell>
                        <Button>
                          <Link to={"/dashboard/inventory/series/" + prods.id}>
                            {prods.name}
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>{prods.price}</TableCell>
                      <TableCell>{prods.stock}</TableCell>
                      <TableCell>{prods.rating}</TableCell>
                      <TableCell>
                        {prods.categories[0] !== undefined
                          ? prods.categories[0].name
                          : null}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    hover={true}
                    sx={{ width: "100%", padding: "10px" }}
                    component="tr"
                    aria-colspan={5}
                  >
                    <TableCell colSpan={6}>
                      <Alert variant="standard" severity="error">
                        No hay stock!
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
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
                color="secondary"
                page={page}
                onChange={paginated}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Inventory;
