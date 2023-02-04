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
import { getPage,getProducts,deletedProducts,pageStatusCero } from "../../../../Redux/Thunks/Products";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";

const Inventory = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { pages } = useSelector((store) => store.products);
 /*  console.log(products); */
  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
    return()=>{
      dispatch(getProducts());
      console.log("unmonted inventory")
    }
  }, [dispatch]);
  const [status,setStatus]=useState("0");
  const [aux,setAux]=useState("0")
  
  function handlerSelect(event){
    setStatus(event.target.value)
    if(status==="0"){
      dispatch(deletedProducts());
      dispatch(pageStatusCero(0));
      dispatch(pageStatusCero(1));
     /*  console.log(status) */
    }else{
      dispatch(getProducts());
      dispatch(getPage(0))
      dispatch(getPage(1))
     /*  console.log(status) */
    }
  };
  function paginated(e){
    setAux(e)
   /*  console.log(e)
    console.log(aux) */
  if(status==="0"){
    console.log("entra a paginated")
    dispatch(getPage(e))
    console.log("sale paginated")
  }else{
    console.log("entra a paginated0")
    dispatch(pageStatusCero(e))
    console.log("sale paginated 0")
  }
  }
  return (
    <Box>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box width={"100%"} padding="20px">
          <TableContainer sx={{ width: { xs: "100%" } }} component={Paper}>
          <Select value={status}  onChange={e=>handlerSelect(e)}>
         <MenuItem value={"0"}>Producto activo</MenuItem>
         <MenuItem value={"1"}>Producto eliminado</MenuItem>
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
                onChange={(e) => {paginated(e.target.innerText)}
                 /* dispatch(getPage(e.target.innerText))  */
                }
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Inventory;
