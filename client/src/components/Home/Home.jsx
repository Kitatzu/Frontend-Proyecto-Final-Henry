import { Alert, Box, Button, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPage, getProductsByCategories } from "../../Redux/Thunks/Products";
import { getCategories } from "../../Redux/Thunks/categories";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import {
  filterPrice,
  filterProduct,
  setIsLog,
  setUserName,
} from "../../Redux/Slices";
import { Link } from "react-router-dom";
import CardFilter from "../CardSwipper/CardFilter/CardFilter";
import CardSwipper from "../CardSwipper/CardSwipper";
import SwipperBrand from "../CardSwipper/CardBrand/SwipperBrand";
import CardCategories from "./CardCategories/CardCategories";
import { getBrands } from "../../Redux/Thunks/brand";
import banner from "../assets/banner.png";
import AppBar from "../AppBar/AppBar";
export default function Home() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { tempProducts, isLoading } = useSelector((state) => state.products);
  const categories = useSelector((store) => store.categories.categories);
  const [filter, setFilter] = useState("Todo");
  const { isLog, isConfirmed } = useSelector((store) => store.users);
  const { pages } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const handleChange = (el) => {
    if (el.target.value !== "Todo") {
      setFilter({ ...filter, [el.target.name]: el.target.value });
      dispatch(getProductsByCategories(el.target.value));
    } else {
      setFilter({ ...filter, [el.target.name]: el.target.value });
      dispatch(getPage(1));
    }
  };

  function handlePrice(e) {
    dispatch(filterPrice({ name: e.target.name, value: e.target.value }));
    dispatch(filterProduct());
  }

  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
    dispatch(getCategories());
    dispatch(getBrands());
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
  }, [dispatch]);

  function filterReset(e) {
    dispatch(getPage(1));
    const priceMin = document.querySelector('input[name="min"]');
    priceMin.value = 0;
    const priceMax = document.querySelector('input[name="max"]');
    priceMax.value = 0;
  }

  return (
    <Box
      sx={{
        background: theme[mode].primary,
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
            flexDirection: "column",
            overflow: "scroll",
            padding: "10px",
          }}
          className="container"
        >
          {!isLog ? (
            <Box padding={"20px"}>
              <Alert variant="filled" severity="warning">
                No olvides registrarte. <Link to="/login">Aqui</Link>
              </Alert>
            </Box>
          ) : (
            !isConfirmed && (
              <Box padding={"20px"}>
                <Alert variant="filled" severity="warning">
                  No olvides confirmar tu email.{" "}
                  <Link to="/verification">Aqui</Link>
                </Alert>
              </Box>
            )
          )}
          <Box
            width={"100%"}
            height={{ xs: "250px", md: "400px" }}
            minHeight={{ xs: "250px", md: "400px" }}
            position="relative"
            id="particles-js"
            sx={{
              background: `url(${banner})`,
              borderRadius: "20px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Swiper */}
            <Box
              top="0px"
              right="0px"
              position="absolute"
              margin="30px"
              display={{ xs: "none", md: "block" }}
            >
              <CardSwipper origin={"banner"} />
            </Box>

            {/* cuadritos */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: " -150px",
                padding: "10px",
              }}
              className="container"
            >
              <Box position={"relative"} width="100%">
                <SwipperBrand />
              </Box>
            </Box>
          </Box>
          <Box marginTop="150px">
            <Box padding="10px" display={{ xs: "block", sm: "none" }}>
              <SearchBar />
            </Box>
            <Box width="100%" display={"flex"} gap="20px" flexWrap={"wrap"}>
              <Typography
                component="h2"
                fontSize="35px"
                sx={{
                  color: theme[mode].textPrimary,
                  padding: "20px",
                  fontWeight: 800,
                }}
              >
                INICIO
              </Typography>
            </Box>
            <Box>
              <Box display={"flex"} gap="20px" flexWrap={"wrap"} padding="20px">
                <Box>
                  <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary, fontWeight: "bold" }}
                  >
                    Precio minimo:
                  </Typography>
                  <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="min"
                    onChange={(e) => handlePrice(e)}
                    style={{
                      padding: "10px",
                      border: "none",
                      background: "#ececec",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary, fontWeight: "bold" }}
                  >
                    Precio maximo:
                  </Typography>
                  <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="max"
                    onChange={(e) => handlePrice(e)}
                    style={{
                      padding: "10px",
                      border: "none",
                      background: "#ececec",
                      borderRadius: "10px",
                      width: "max-content",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              display={"flex"}
              width="100%"
              flexWrap={"wrap"}
              justifyContent="center"
            >
              <Button
                onClick={filterReset}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "20px",
                  background: theme[mode].cardCategory,
                  width: "300px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box padding={"20px"}>
                  <Typography sx={{ color: "white" }}>TODO</Typography>
                </Box>
              </Button>
              {/* {categories
                ? categories.map((cat, key) => (
                    <CardCategories
                      value={cat.name}
                      img={cat.img}
                      id={cat.id}
                      key={key}
                    />
                  ))
                : null} */}
              <CardFilter />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                padding: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading && <Loading />}
              {tempProducts
                ? tempProducts?.map((el, key) => {
                    return (
                      <Cards
                        key={key}
                        id={el.id}
                        img={el.img}
                        name={el.name}
                        description={el.description}
                        rating={el.rating}
                        price={el.price}
                      />
                    );
                  })
                : null}
            </Box>

            <Box
              width={"100%"}
              padding="20px"
              display={"flex"}
              justifyContent="center"
            >
              {pages > 1 ? (
                <Pagination
                  count={pages}
                  color="secondary"
                  onChange={(e) => {
                    console.log(e);
                    dispatch(getPage(e.target.innerText));
                  }}
                />
              ) : null}
              {pages ? null : (
                <Alert severity="error">No hay stock disponible!</Alert>
              )}
            </Box>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
      <AppBar />
    </Box>
  );
}
