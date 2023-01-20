import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";
import Categories from "./inputs/Categories";
import Providers from "./inputs/Providers";

export default function CreateProduct() {
  const [newProduct, setNewProduct] = useState({});
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  //   const addServices = (formData) => {
  //     return async function (dispatch) {
  //       let info = await axios({
  //         url:  ${url}/services,
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         data: formData,
  //       });
  //       console.log(info);
  //       dispatch({ type: ADD_SERVICES, payload: info.data });
  //     };
  //   };
  console.log(newProduct);
  return (
    <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box
          sx={{
            width: "calc(100% - 80px)",
            height: "calc(100vh - 64px)",
            overflow: "scroll",
          }}
        >
          <Box padding={"20px"} display="flex">
            <Box
              component={"form"}
              display={"flex"}
              flexDirection="row"
              justifyContent={"space-between"}
              alignContent="center"
              width={"420px"}
            >
              <Box
                width={"45%"}
                gap="10px"
                display={"flex"}
                flexDirection="column"
              >
                <Box padding={"10px 0"}>
                  <Typography component={"h2"} fontSize="25px">
                    Crear Producto
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="Nombre del producto"
                    name="name"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    multiline
                    name="description"
                    label="Descripcion"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    label="N° Serie"
                    name="serie"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Tipo de producto"
                    name="type"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Marca"
                    name="marca"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Precio"
                    name="precio"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box
                width={"45%"}
                gap="10px"
                display={"flex"}
                flexDirection="column"
              >
                <Categories />
                <Providers />
                <Button variant="contained" color="primary">
                  Guardar
                </Button>
              </Box>
            </Box>
            <Box
              sx={{ width: "calc(100% - 420px )" }}
              display="flex"
              justifyContent={"center"}
            >
              <Box>
                <Box sx={{ width: "200px" }}>
                  <img src="" alt="product" width="100%" />
                </Box>

                <Box sx={{ width: "300px", padding: "10px" }}>
                  <Typography fontWeight={"bold"}>{newProduct.name}</Typography>
                </Box>
                <Box sx={{ width: "300px", padding: "20px" }}>
                  <Typography>{newProduct.description}</Typography>
                </Box>
                <Box>
                  <Typography>{newProduct.serie}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
