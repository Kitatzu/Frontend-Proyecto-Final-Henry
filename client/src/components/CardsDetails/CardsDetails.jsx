import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByID } from "../../Redux/Thunks/Products";
import imgDefault from "../assets/imgDefault.png";
import {
  Box,
  Typography,
  Stack,
  Rating,
  Chip,
  Alert,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Icon } from "@iconify/react";
import Toast from "../Toast/Toast";
import { setCart } from "../../Redux/Thunks/getCart";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { setIsLog, setUserName } from "../../Redux/Slices";
import Reviews from "./Reviews/Reviews";
import CardSwipper from "../CardSwipper/CardSwipper";
import { getReviews, validateRating } from "../../Redux/Thunks/reviews";

const CardsDetails = () => {
  const { productDetail } = useSelector((store) => store.products);
  const loadingCart = useSelector((store) => store.cart.isLoading);
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  const { isLog = false } = useSelector((store) => store.users);
  const [cantidadProducto, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductByID(id));
    dispatch(getReviews(id));

    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
      dispatch(
        validateRating(id, JSON.parse(localStorage.getItem("token")).userId)
      );
    }
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        background: Theme[mode].primary,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            width: { xs: "100%", sm: "calc(100% - 80px)" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",

            padding: { xs: "5px", sm: "20px" },
            overflow: "scroll",
            minHeight: "max-content",
          }}
          className="container"
        >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            width="100%"
            flexDirection={{ xs: "column", md: "row" }}
            padding={{ xs: "10px", md: "20px" }}
          >
            <Box width={{ xs: "400px", md: "40%" }} padding={"20px"}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  minWidth: "200px",
                }}
                src={productDetail?.img ? productDetail.img : imgDefault}
                alt="Product"
              />
            </Box>

            <Box width={{ xs: "100%", md: "50%" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ color: Theme[mode].textPrimary }}
              >
                {productDetail?.name.toUpperCase()}
              </Typography>
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                width="100%"
                padding="20px"
              >
                <Stack spacing={1} marginLeft={"10px"}>
                  <Rating
                    name="half-rating-read"
                    value={productDetail?.rating}
                    size="large"
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <Typography
                  fontWeight={"bold"}
                  sx={{ color: Theme[mode].textPrimary }}
                >
                  DESCRIPTION
                </Typography>
                <Typography sx={{ color: Theme[mode].textPrimary }}>
                  {productDetail?.description}
                </Typography>
                <Box
                  width={"100%"}
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Chip
                    fontWeight={"bold"}
                    label={"$" + productDetail?.price}
                    variant="filled"
                    color="info"
                    sx={{
                      width: "max-content",
                      padding: "10px",
                      marginRight: "20px",
                    }}
                  />
                  <Alert severity="success" variant="filled">
                    <Typography fontWeight={"bold"} component="p">
                      STOCK:{productDetail?.stock}. Compralo ya!
                    </Typography>
                  </Alert>
                </Box>
              </Box>
              <Box
                width={"100%"}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                padding="20px"
                gap={"20px"}
                flexWrap="wrap"
              >
                <TextField
                  label="Cantidad"
                  variant="standard"
                  type={"number"}
                  onChange={(e) => {
                    if (e.target.value > productDetail?.stock) {
                      Toast.fire({
                        icon: "warning",
                        title: "Valor supera el STOCK!",
                      });
                    } else if (e.target.value < 1) {
                      Toast.fire({
                        icon: "warning",
                        title: "Valor menor a 1!",
                      });
                    } else {
                      setCantidad(e.target.value);
                    }
                  }}
                  value={cantidadProducto}
                />
                <LoadingButton
                  loading={loadingCart}
                  loadingPosition="end"
                  endIcon={<Icon icon="material-symbols:shopping-cart" />}
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    if (
                      cantidadProducto > 0 &&
                      cantidadProducto <= productDetail.stock &&
                      isLog
                    ) {
                      dispatch(
                        setCart({
                          quantity: cantidadProducto,
                          productId: id,
                        })
                      );
                    } else {
                      if (isLog) {
                        Toast.fire({
                          icon: "error",
                          title: "Error al elegir cantidad de producto!",
                        });
                      } else {
                        Toast.fire({
                          icon: "warning",
                          title: "Recuerda registrarte para realizar compras!",
                        });
                      }
                    }
                  }}
                >
                  Add to Cart
                </LoadingButton>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent="center" padding={"20px"}>
            <Typography fontSize={"28px"}>Productos populares.</Typography>
          </Box>
          <Box width={"100%"} sx={{ background: "#cecece" }}>
            <CardSwipper origin={"other"} />
          </Box>

          <Box>
            <Reviews />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardsDetails;
