import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByID } from "../../Redux/Thunks/Products";
import imgDefault from "../assets/imgDefault.png";

import { Box, Typography, Paper, Stack, Rating, Chip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Icon } from "@iconify/react";
import Toast from "../Toast/Toast";
import { setCart } from "../../Redux/Thunks/getCart";
import NavBar from "../NavBar/NavBar";

const CardsDetails = () => {
  const { products } = useSelector((store) => store.products);
  const loadingCart = useSelector((store) => store.cart.isLoading);
  const [cantidadProducto, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(products);

  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch, id]);

  return (
    <Box>
      <NavBar />
      <Paper>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          flexWrap="wrap"
          width="100%"
          padding={"20px"}
          minHeight={"100vh"}
        >
          <Box width="350px" padding={"20px"}>
            <img
              style={{ width: "100%", borderRadius: "20px" }}
              src={products?.img ? products.img : imgDefault}
              alt="Product"
            />
          </Box>

          <Box>
            <Typography variant="h3" gutterBottom>
              {products?.name.toUpperCase()}
            </Typography>
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={products?.rating}
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
              <Typography>{products?.description}</Typography>
              <Box>
                <Chip
                  fontWeight={"bold"}
                  label={"$" + products?.price}
                  variant="filled"
                  color="info"
                  sx={{ width: "max-content", padding: "10px" }}
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
                      cantidadProducto < products.stock
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
                  Enviar al carrito
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CardsDetails;
