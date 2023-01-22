import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../../NavBar/NavBar";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Categories from "./inputs/Categories";
import Providers from "./inputs/Providers";
import imgDefault from "../../../assets/imgDefault.png";
import { addProduct, createProduct } from "../../../../Redux/Thunks/Products";
import { getCategories } from "../../../../Redux/Thunks/categories";
import { getProviders } from "../../../../Redux/Thunks/providers";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import Toast from "../../../Toast/Toast";
import { getBrands } from "../../../../Redux/Thunks/brand";
import Brands from "./inputs/Brands";
export default function CreateProduct() {
  const dispatch = useDispatch();
  const [addSeries, setAddseries] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const LoadingProduct = useSelector((store) => store.products.isLoading);
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const handleSave = (e) => {
    // const formData = new FormData();

    // formData.append("userEmail", userEmail);
    // formData.append("image", image);
    // formData.append("name", input.name);
    // formData.append("description", input.description);
    // formData.append("price", input.price);
    // formData.append("country", input.country);
    dispatch(createProduct(newProduct));
  };
  const [serie, setSerie] = useState("");

  const productId = useSelector((store) => store.products.productCreate.id);
  const series = useSelector((store) => store.products.productCreate.series);
  console.log(productId);
  const handleSerie = (e) => {
    console.log(e);
    if (productId) {
      setSerie(e.target.value);
    } else {
      Toast.fire({ icon: "error", title: "No existe producto!" });
    }
  };
  const addSerie = (e) => {
    if (serie !== "") {
      dispatch(addProduct(serie, productId));
      setSerie("");
    } else {
      Toast.fire({ icon: "error", title: "Campo vacio!" });
    }
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProviders());
    dispatch(getBrands());
  }, [dispatch]);

  const { categories } = useSelector((store) => store.categories);
  const { providers } = useSelector((store) => store.providers);
  const { brands } = useSelector((store) => store.brands);
  const handleChange = (e, type) => {
    if (type === "categories" && type !== undefined) {
      console.log(type);

      setNewProduct({
        ...newProduct,
        categories: e.target.attributes.value.value,
      });
    } else if (type === "providers" && type !== undefined) {
      setNewProduct({
        ...newProduct,
        proveedor: e.target.attributes.value.value,
      });
    } else if (type === "brand" && type !== undefined) {
      setNewProduct({
        ...newProduct,
        brand: e.target.attributes.value.value,
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
            padding={{ xs: "10px", md: "20px" }}
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
                  <Typography
                    component={"h2"}
                    fontSize="25px"
                    sx={{ color: theme[mode].textPrimary }}
                  >
                    Crear Producto
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="Nombre del producto"
                    name="name"
                    InputProps={{ style: { color: theme[mode].textPrimary } }}
                    sx={{ width: "100%", color: theme[mode].textPrimary }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    multiline
                    name="description"
                    label="Descripcion"
                    InputProps={{ style: { color: theme[mode].textPrimary } }}
                    sx={{ width: "100%", color: theme[mode].textPrimary }}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <TextField
                    label="Tipo de producto"
                    name="typeProduct"
                    InputProps={{ style: { color: theme[mode].textPrimary } }}
                    sx={{ width: "100%", color: theme[mode].textPrimary }}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Precio"
                    name="price"
                    InputProps={{ style: { color: theme[mode].textPrimary } }}
                    sx={{ width: "100%", color: theme[mode].textPrimary }}
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
                <Categories
                  handleChange={handleChange}
                  categories={categories}
                />
                <Providers handleChange={handleChange} providers={providers} />
                <Brands brands={brands} handleChange={handleChange} />
                <Box>
                  <TextField
                    label="Imagen URL"
                    name="img"
                    InputProps={{ style: { color: theme[mode].textPrimary } }}
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Box>
                <LoadingButton
                  loading={LoadingProduct}
                  loadingPosition="end"
                  endIcon={
                    <Icon icon="material-symbols:save-as-outline-rounded" />
                  }
                  variant="contained"
                  color="secondary"
                  onClick={handleSave}
                >
                  Guardar
                </LoadingButton>
              </Box>
            </Box>
            <Box
              sx={{ width: { xs: "100%", md: "calc(100% - 420px )" } }}
              display="flex"
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems="center"
            >
              <Box
                sx={{
                  background: theme[mode].cardSecondary,
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
                <Box>
                  <Typography>Añadir series</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => setAddseries(true)}
                  >
                    <Icon icon="material-symbols:add-circle-outline" />
                  </IconButton>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <img
                    src={newProduct.img ? newProduct.img : imgDefault}
                    alt="product"
                    width="100%"
                    style={{ borderRadius: "20px" }}
                  />
                </Box>

                <Typography
                  fontWeight={"bold"}
                  sx={{ color: theme[mode].textPrimary }}
                >
                  {newProduct.name}
                </Typography>

                <Box sx={{ width: "300px", padding: "20px" }}>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {newProduct.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"STOCK: " + series.length}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"Tipo: " + newProduct.typeProduct}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"MARCA: " + newProduct.brand}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"CATEGORIA: " + newProduct.categories}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"PROVEEDOR: " + newProduct.proveedor}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"Precio: " + newProduct.price + "$"}
                  </Typography>
                </Box>
              </Box>
              {addSeries ? (
                <Box>
                  <List>
                    {series
                      ? series.map((serie) => (
                          <ListItem color="primary">
                            <ListItemButton color="primary">
                              <ListItemText
                                primary={serie}
                                primaryTypographyProps={{
                                  color: "primary",
                                  fontWeight: "medium",
                                  variant: "body2",
                                }}
                                sx={{
                                  background: "#ffff",
                                  padding: "5px 20px",
                                  color: "white !important",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))
                      : null}
                  </List>
                  <Box>
                    <TextField
                      label="N° Serie"
                      name="serie"
                      value={serie}
                      InputProps={{ style: { color: theme[mode].textPrimary } }}
                      sx={{ width: "100%", color: theme[mode].textPrimary }}
                      onChange={handleSerie}
                    />
                    <LoadingButton
                      loading={LoadingProduct}
                      loadingPosition="end"
                      endIcon={
                        <Icon icon="material-symbols:save-as-outline-rounded" />
                      }
                      variant="contained"
                      color="secondary"
                      onClick={addSerie}
                    >
                      Agregar
                    </LoadingButton>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
