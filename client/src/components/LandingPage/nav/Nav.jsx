import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const { buttonPrimary } = useSelector((store) => store.theme.dark);
  return (
    <Box padding={"20px"} width={"100%"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "30px" },
              fontWeight: "800",
              color: "#308FFD",
            }}
            fontFamily="sans-serif"
          >
            NOVA
          </Typography>
        </Box>
        <Link to={"/login"}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              fontSize: "10px",
              background: buttonPrimary,
            }}
          >
            <Typography>ACCEDER / REGISTRAR</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Nav;
