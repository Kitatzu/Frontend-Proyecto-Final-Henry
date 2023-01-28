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
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../../../../Redux/Thunks/Products";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";

const Inventory = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { pages } = useSelector((store) => store.products);
  console.log(products);
  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
  }, [dispatch]);
  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box width={"100%"} padding="20px">
          <TableContainer sx={{ width: { xs: "100%" } }} component={Paper}>
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
                onChange={(e) => {
                  console.log(e);

                  dispatch(getPage(e.target.innerText));
                }}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Inventory;
