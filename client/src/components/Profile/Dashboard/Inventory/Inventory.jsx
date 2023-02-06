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
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPage,
  getProducts,
  deletedProducts,
  pageStatusCero,
} from "../../../../Redux/Thunks/Products";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";

const Inventory = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { pages } = useSelector((store) => store.products);
  const [page, setPage] = useState(1);
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
  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box width={"100%"} padding="20px">
          <TableContainer sx={{ width: { xs: "100%" } }} component={Paper}>
            <Select value={status} onChange={(e) => handlerSelect(e)}>
              <MenuItem value={"1"}>Producto activo</MenuItem>
              <MenuItem value={"0"}>Producto eliminado</MenuItem>
            </Select>
            <Table>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Acciones</TableCell>
              </TableHead>

              <TableBody>
                {products?.length > 0 ? (
                  products.map((prods) => (
                    <TableRow key={prods.id}>
                      <TableCell>{prods.name}</TableCell>
                      <TableCell>{prods.price}</TableCell>
                      <TableCell>{prods.stock}</TableCell>
                      <TableCell>{prods.rating}</TableCell>
                      <TableCell>
                        {prods.categories[0] !== undefined
                          ? prods.categories[0].name
                          : null}
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <Icon icon="carbon:db2-buffer-pool" />
                        </IconButton>
                      </TableCell>
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
