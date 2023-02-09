import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import bgAppBar from "../assets/img/appbar.png";
import Item from "../Item/Item";
const AppBar = () => {
  const Theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 999999999999,
        bottom: 0,
        left: 0,
        width: "100%",
        display: { xs: "block", sm: "none" },
      }}
    >
      <img
        src={bgAppBar}
        alt="appbar"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
        display={"flex"}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box display="flex" padding={"0px 10px"}>
          <IconButton size="large">
            <Link to="/cart">
              <Icon icon="ic:round-shopping-cart" color="white" />
            </Link>
          </IconButton>
          <IconButton size="large">
            <Link to="/invoices">
              <Icon icon="uil:invoice" color="white" />
            </Link>
          </IconButton>
        </Box>

        <button
          size="large"
          style={{
            marginBottom: "50px",
            position: "absolute",
            width: "60px",
            height: "60px",
            left: "calc(50% - 30px)",
            background: "#1976D2",
            borderRadius: "50%",
            bottom: "-20px",
            border: "none",
            boxShadow:
              "0px 41px 43px rgba(86, 86, 86, 0.25), 0px 17.1288px 17.9644px rgba(86, 86, 86, 0.179714), 0px 9.15789px 9.60461px rgba(86, 86, 86, 0.149027), 0px 5.13384px 5.38427px rgba(86, 86, 86, 0.125), 0px 2.72654px 2.85954px rgba(86, 86, 86, 0.100973), 0px 1.13458px 1.18992px rgba(86, 86, 86, 0.0702864)",
            borderLeft: "1px solid rgba(255,255,255,.1)",
            borderBottom: "1px solid rgba(255,255,255,.1)",
            borderRight: "2px solid rgba(255,255,255,.3)",
            borderTop: "2px solid rgba(255,255,255,.3)",
          }}
        >
          <Link to="/home">
            <Icon
              icon="material-symbols:home-app-logo"
              color="#f2f2f2"
              width={"40px"}
            />
          </Link>
        </button>
        <IconButton size="large" sx={{ margin: "0 30px" }}>
          <Link to="/chat">
            <Icon icon="material-symbols:chat" color="white" />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};
export default AppBar;
