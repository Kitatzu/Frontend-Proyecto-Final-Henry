import {
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

import Toast from "../../../Toast/Toast";
import { getBrands } from "../../../../Redux/Thunks/brand";
import Brands from "./inputs/Brands";
import Sidebar from "../Utils/global/Sidebar";
export default function CreateProduct() {
  const dispatch = useDispatch();

  const [addSeries, setAddseries] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const LoadingProduct = useSelector((store) => store.products.isLoading);
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);

  const [serie, setSerie] = useState("");
  const [image, setImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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
  const handleImage = (el) => {
    setImage(el.target.files["0"]);
    setPreviewUrl(URL.createObjectURL(el.target.files[0]));
    console.log(el.target.files["0"]);
  };
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
        provider: e.target.attributes.value.value,
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
  const handleSave = (e) => {
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("typeProduct", newProduct.typeProduct);
    formData.append("provider", newProduct.provider);
    formData.append("brand", newProduct.brand);
    formData.append("categories", newProduct.categories);
    if (image) {
      console.log(image);
      formData.append("img", image);
    }
    (async () => {
      dispatch(createProduct(formData));
    })();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <NavBar />
      <Box display={"flex"} height="max-content" position="relative">
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            height: "100%",
            minHeight: "950.2px",
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
              sx={{
                background: "rgba(255,255,255,.3)",
                backdropFilter: "blur(20px)",
                padding: "20px",
                borderTop: theme.mode === "dark" ? "8px solid #4EEB0D" : "none",
              }}
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
                  <Box>
                    {/* <input type="file" onChange={handleImage} /> */}
                    <div class="input-file">
                      <input
                        type="file"
                        id="file"
                        class="input-file-input"
                        onChange={handleImage}
                      />
                      <label for="file" class="input-file__btn">
                        Seleccionar archivo
                      </label>
                    </div>
                  </Box>
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
                  borderRadius: "40px",
                  margin: "20px 0",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(50px)",
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
                    src={previewUrl ? previewUrl : imgDefault}
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
                    {"Stock: " + series.length}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"Tipo: " + newProduct.typeProduct}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"Marca: " + newProduct.brand}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"CATEGORIA: " + newProduct.categories}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: theme[mode].textPrimary }}>
                    {"PROVEEDOR: " + newProduct.provider}
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
