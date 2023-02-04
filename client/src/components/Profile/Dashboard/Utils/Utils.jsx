import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Utils = () => {
  return (
    <Box
      padding={"20px"}
      display="flex"
      width={"100%"}
      justifyContent={"space-around"}
      gap="20px"
    >
      <Button variant="contained">
        <Link to="crud">
          <Typography sx={{ color: "white" }}>Crear producto.</Typography>
        </Link>
      </Button>
      <Button variant="contained">
        <Link to="inventory">
          <Typography sx={{ color: "white" }}>Inventario</Typography>
        </Link>
      </Button>
      <Button variant="contained">
        <Link to="/dashboard/users">
          <Typography sx={{ color: "white" }}>Clientes........</Typography>
        </Link>
      </Button>
      <Button variant="contained">
        <Link to="/dashboard/facturas">
          <Typography sx={{ color: "white" }}>Facturas........</Typography>
        </Link>
      </Button>
    </Box>
  );
};
export default Utils;
