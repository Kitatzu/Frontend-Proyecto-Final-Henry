import { Box, Button, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Brand from "./Brand/Brand";
import Bubles from "./Bubles/Bubles";

import "./LandingPage.css";
import Nav from "./nav/Nav";
import SwipeImage from "./SwipeImage/SwipeImage";

const LandingPage = () => {
  const Theme = useSelector((store) => store.theme);
  return (
    <Box
      className="container"
      sx={{
        width: "100%",
        height: "max-content",
        minHeight: "100vh",
        background: Theme["dark"].primary,
        backgroundSize: "cover",
      }}
      position="relative"
    >
      <Nav />
      <Box display={"flex"} justifyContent="center" flexWrap={"wrap"}>
        <Box
          padding={"20px"}
          display="flex"
          flexDirection={"column"}
          width="max-content"
        >
          <Brand />

          <Box width={{ xs: "100%", md: "415.14px" }}>
            <Typography
              sx={{ width: "100%", padding: "20px", color: "#fafafa" }}
              component="p"
            >
              Box Tech proporciona selección de piezas de computadora, para los
              constructores de computadoras DIY ( do-it-yourself ). Facilitamos
              la creación de su lista personal de piezas.
            </Typography>
            <Box padding="20px">
              <Button
                variant="contained"
                sx={{
                  background: "#ffff",
                  color: "#272727",
                  borderRadius: "20px",
                }}
              >
                <Link to={"/home"}>EXPLORAR</Link>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          position={"relative"}
          overflow="hidden"
          width={{ xs: "100%", md: "max-content" }}
          padding="20px"
        >
          <SwipeImage />
        </Box>
      </Box>

      <Bubles size={"200px"} top="50%" right={"450px"} delay="1s" />
      <Bubles size={"100px"} top="20%" right={"250px"} delay="2s" />
    </Box>
  );
};
export default LandingPage;
