import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";
import Categories from "./inputs/Categories";
import Providers from "./inputs/Providers";
import imgDefault from "../../../assets/imgDefault.png";
export default function CreateProduct() {
  const [newProduct, setNewProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const handleSave = (e) => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    // formData.append("userEmail", userEmail);
    // formData.append("image", image);
    // formData.append("name", input.name);
    // formData.append("description", input.description);
    // formData.append("price", input.price);
    // formData.append("country", input.country);
  };
  const handleChange = (e, type) => {
    if (type === "categories" && type !== undefined) {
      console.log(type);
      setCategories([...categories, e.target.attributes.value.value]);
      setNewProduct({
        ...newProduct,
        categorie: e.target.attributes.value.value,
      });
    } else if (type === "providers" && type !== undefined) {
      setNewProduct({
        ...newProduct,
        provider: e.target.attributes.value.value,
      });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
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
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 64px)",
            overflow: "scroll",
            background: theme[mode].primary,
          }}
        >
          <Box
            padding={{ xd: "0px", md: "20px" }}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              component={"form"}
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              alignContent="center"
              alignItems={"center"}
              width={{ xs: "100%", sm: "420px" }}
            >
              <Box
                width={{ xs: "100%", sm: "45%" }}
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
                    name="price"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box
                width={{ xs: "100%", sm: "45%" }}
                gap="10px"
                display={"flex"}
                flexDirection="column"
                margin={"20px 0"}
              >
                <Categories handleChange={handleChange} />
                <Providers handleChange={handleChange} />
                <TextField type={"file"} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
            <Box
              sx={{ width: { xs: "100%", md: "calc(100% - 420px )" } }}
              display="flex"
              justifyContent={"center"}
            >
              <Box
                sx={{
                  background: "white",
                  padding: "10px",
                  width: { xs: "100%", md: "max-content" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  border: "2px solid rgba(0,0,0,.2)",
                  borderRadius: "20px",
                  margin: "20px 0",
                }}
              >
                <Box sx={{ width: "200px" }}>
                  <img src={imgDefault} alt="product" width="100%" />
                </Box>

                <Typography fontWeight={"bold"}>{newProduct.name}</Typography>

                <Box sx={{ width: "300px", padding: "20px" }}>
                  <Typography>{newProduct.description}</Typography>
                </Box>
                <Box>
                  <Typography>{"SERIE: " + newProduct.serie}</Typography>
                </Box>

                <Box>
                  <Typography>{"Tipo: " + newProduct.type}</Typography>
                </Box>

                <Box>
                  <Typography>{"MARCA: " + newProduct.marca}</Typography>
                </Box>

                <Box>
                  <Typography>
                    {"CATEGORIA: " + newProduct.categorie}
                  </Typography>
                </Box>
                <Box>
                  <Typography>{"PROVEEDOR: " + newProduct.provider}</Typography>
                </Box>
                <Box>
                  <Typography>{"Precio: " + newProduct.price + "$"}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
