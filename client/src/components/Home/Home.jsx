import { Alert, Box, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPage } from "../../Redux/Thunks/Products";

import GPUimage from "../assets/rtx3090_1.png";
import amdImage from "../assets/amd-default-social-image-1200x628.webp";
import intelImage from "../assets/Intel-nuevo-logo-2-1200x900.png";
import nvidiaImage from "../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png";
import { getCategories } from "../../Redux/Thunks/categories";
import SearchBar from "../SearchBar/SearchBar";
import FilterPrice from "../FilterPrice/FilterPrice";

export default function Home() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { tempProducts, isLoading } = useSelector((state) => state.products);
  const products = tempProducts?.map(el => el[1])
  const categories = useSelector((store) => store.categories.categories);
  const [filter, setFilter] = useState("Todo");

  const { pages } = useSelector((store) => store.products);

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setFilter(e.target.value);
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
    dispatch(getCategories());
  }, [dispatch]);

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

            padding: { xs: "10px", sm: "20px" },
            overflow: "scroll",
          }}
        >
          <Box
            width={"100%"}
            minHeight={{ xs: "200px", sm: "350px" }}
            position="relative"
            borderRadius={{ xs: "0", sm: "20px" }}
            sx={{ background: `url(${GPUimage})`, backgroundSize: "cover" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: " -100px",
                display: "flex",
                overflow: "scroll",
                padding: "10px",
                justifyContent: { xs: "center", sm: "space-around" },
                gap: { xs: "20px", sm: "none" },
                alignItems: "center",
              }}
              className="container"
            >
              <Box
                sx={{
                  filter:
                    "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
                  width: { xs: "150px", sm: "240px" },
                  height: { xs: "150px", sm: "240px" },
                  minWidth: { xs: "150px", sm: "240px" },
                  borderRadius: "20px",
                  background: `url(${intelImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
              <Box
                sx={{
                  filter:
                    "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
                  width: { xs: "150px", sm: "240px" },
                  height: { xs: "150px", sm: "240px" },
                  minWidth: { xs: "150px", sm: "240px" },
                  borderRadius: "20px",
                  background: `url(${amdImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>

              <Box
                sx={{
                  filter:
                    "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
                  width: { xs: "150px", sm: "240px" },
                  height: { xs: "150px", sm: "240px" },
                  minWidth: { xs: "150px", sm: "240px" },
                  borderRadius: "20px",
                  background: `url(${nvidiaImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </Box>
          </Box>
          <Box marginTop="150px">
            <Box padding="10px" display={{ xs: "block", sm: "none" }}>
              <SearchBar />
            </Box>
            <Box width="100%" display={"flex"} gap="20px" flexWrap={"wrap"}>
              <Typography
                component="h2"
                fontSize="20px"
                sx={{ color: theme[mode].textPrimary }}
              >
                {filter.toUpperCase()}:
              </Typography>
              <select
                // onChange={handleChange}
                style={{
                  background: "transparent",
                  border: "none",
                  color: theme[mode].textPrimary,
                }}
              >
                <option value="Todo" id="Todo" key="Todo">
                  Todo
                </option>
                {categories
                  ? categories.map((cat) => (
                      <option
                        value={cat.name}
                        id={cat.id}
                        key={cat.id}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: theme[mode].textPrimary,
                        }}
                      >
                        {cat.name}
                      </option>
                    ))
                  : null}
              </select>
              <Box>
                <FilterPrice />
              </Box>
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
              {isLoading && <div></div>}
              {products
                ? products.map((el, key) => {
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
              {pages ? (
                <Pagination
                  count={pages}
                  color="secondary"
                  onChange={(e) => {
                    console.log(e);

                    dispatch(getPage(e.target.innerText));
                  }}
                />
              ) : (
                <Alert severity="error">No hay stock disponible!</Alert>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
