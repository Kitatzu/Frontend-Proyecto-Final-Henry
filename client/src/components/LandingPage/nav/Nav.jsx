import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Icon } from "@iconify/react";

import MuiSwitch from "../../MuiSwitch/MuiSwitch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Nav = () => {
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  const [redir, setRedir] = useState(false);
  return (
    <Box padding={"10px"} position="fixed" width={"100%"}>
      {/* {redir ? <Redirect to={`/${redir}`} /> : null} */}
      <Box display={"flex"} justifyContent="flex-end">
        {/* <Box display={{ xs: "none", sm: "inline-block" }}>
          <Button
            startIcon={<Icon icon="mdi:marketplace-outline" />}
            sx={{ color: theme[mode].textPrimary }}
          >
            Market
          </Button>
        </Box> */}
        <Box display={"flex"} gap="20px">
          <MuiSwitch />
          <Link to={"login"}>
          <Button
            variant="contained"
            sx={{ borderRadius: "20px", fontSize: "10px" }}
          >
            Login / Register
          </Button>
          </Link>
          {/* <Link to="/register">
            <Button
              variant="contained"
              sx={{ borderRadius: "20px", fontSize: "10px" }}
              color="secondary"
              onClick={() => {
                setRedir("register");
              }}
            >
              Register
            </Button>
          </Link>  */}
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
