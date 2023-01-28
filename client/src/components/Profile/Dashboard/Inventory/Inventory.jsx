import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

const Inventory = () => {
  const { products } = useSelector((store) => store.products);
  return (
    <Box padding={"20px"}>
      <TableContainer sx={{ width: { xs: "100%" } }}>
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
            {products ? (
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
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <Alert variant="filled" severity="error">
                  No hay stock!
                </Alert>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Inventory;
