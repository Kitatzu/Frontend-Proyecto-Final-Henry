import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import spin from "../assets/spin.png";
import imageLanding from "../assets/graficaLanding.png";
import "./Home.css";

const Home = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <Box
      className="container"
      sx={{
        height: { xs: "max-content", sm: "max-content", md: "100vh" },
        overflow: { xs: "none", sm: "hidden" },
        background: Theme[mode].primary,
      }}
    >
      <Box
        sx={{ width: "100%" }}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
      >
        <Box sx={{ width: "70%", padding: "20px" }}>
          <img style={{ width: "100%" }} src={imageLanding} alt="tech" />
        </Box>
        <Box sx={{ height: "100%", display: "" }}>
          <Box padding={"20px"}>
            <Typography
              component={"h2"}
              fontSize="45px"
              sx={{ color: Theme[mode].textPrimary }}
            >
              Nombre de la pagina.
            </Typography>
          </Box>

          <Box padding={"20px"}>
            <Typography sx={{ color: Theme[mode].textPrimary }}>
              Our utility palette/semantic palette is comprised of green,
              yellow, and red. Semantic color helps users find people, identify
              status,
            </Typography>
          </Box>
          <Box padding={"20px"}>
            <Button
              startIcon={<Icon icon="fluent:arrow-join-20-regular" />}
              variant="contained"
              sx={{ background: Theme[mode].buttonPrimary }}
            >
              JOIN IN THE FIGHT
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display={{ xs: "none", sm: "none", md: "flex" }}
        position="absolute"
        bottom={"0"}
        right="0"
        padding={"20px"}
      >
        <img className="spin" src={spin} alt="spin" />
      </Box>
    </Box>
  );
};
export default Home;
