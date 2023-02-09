import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Global from "../../Global";
import logoWhite from "../assets/LogoWhite.png";
import logoDark from "../assets/LogoDark.png";

const PageNotFound = () => {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);

  const timeOut = () => {
    window.setTimeout(function () {
      window.location.href = `${Global.FRONTURL}/home`;
    }, 3000);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      sx={{
        background: theme[mode].primary,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <img src={logoWhite ? logoWhite : logoDark} alt="logo" />
      <Typography
        component={"h2"}
        fontSize="4rem"
        fontWeight={"bold"}
        sx={{ color: theme[mode].textPrimary, padding: "20px" }}
      >
        Error 404 esta pagina no existe!
      </Typography>
      {timeOut()}
    </Box>
  );
};

export default PageNotFound;
