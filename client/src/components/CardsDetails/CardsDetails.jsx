import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByID } from "../../Redux/Thunks/Products";
import imgDefault from "../assets/imgDefault.png";

import { Box, Typography, Stack, Rating, Chip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Icon } from "@iconify/react";
import Toast from "../Toast/Toast";
import { setCart } from "../../Redux/Thunks/getCart";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar"
import { setIsLog, setUserName } from "../../Redux/Slices";
import Reviews from "./Reviews/Reviews";

const CardsDetails = () => {
  const { products } = useSelector((store) => store.products);
  const loadingCart = useSelector((store) => store.cart.isLoading);
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  const [cantidadProducto, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(products?.rating);

  useEffect(() => {
    dispatch(getProductByID(id));
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ background: Theme[mode].primary}}>
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box
            sx={{
              height: "calc(100vh - 64px)",
              width: { xs: "100%", sm: "calc(100% - 80px)" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: "10px", sm: "20px" },
              overflow: "scroll",
            }}
          >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            width="100%"
            minHeight={"10vh"}
          >
            <Box width="350px" padding={"20px"}>
              <img
                style={{ width: "100%", borderRadius: "20px" }}
                src={products?.img ? products.img : imgDefault}
                alt="Product"
              />
            </Box>

            <Box>
              <Typography variant="h3" gutterBottom sx={{color: Theme[mode].textPrimary}}>
                {products?.name.toUpperCase()}
              </Typography>
              <Stack spacing={1} marginLeft={"10px"}>
                <Rating
                  name="half-rating-read"
                  value={products?.rating}
                  size="large"
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{color: Theme[mode].textPrimary}}>{products?.description}</Typography>
                <Box>
                  <Chip
                    fontWeight={"bold"}
                    label={"$" + products?.price}
                    variant="filled"
                    color="info"
                    sx={{ width: "max-content", padding: "10px", marginRight: "20px"}}
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
                        cantidadProducto <= products.stock
                      ) {
                        dispatch(
                          setCart({
                            quantity: cantidadProducto,
                            productId: id,
                          })
                        );
                      } else {
                        Toast.fire({
                          icon: "error",
                          title: "Error al elegir cantidad de producto!",
                        });
                      }
                    }}
                  >
                    Add to Cart
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box >
            <Reviews />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardsDetails;
