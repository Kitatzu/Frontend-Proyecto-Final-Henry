import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LogoDark from "../../assets/LogoDark.png";
import React from "react";

export default function Brand() {
  return (
    <Box
      width={"max-content"}
      display="flex"
      flexDirection={"column"}
      padding="20px"
    >
      <Box
        display={"flex"}
        justifyContent="flex-start"
        alignItems={"center"}
        gap="20px"
      >
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "60px" },
            fontWeight: 800,
            color: "#308FFD",
          }}
          component="h1"
        >
          NOVA
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "30px", sm: "60px" }, color: "#FFFF" }}
          component="h2"
        >
          TECH
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent="flex-start"
        alignItems={"center"}
        gap="20px"
      >
        <Typography
          sx={{ fontSize: { xs: "30px", sm: "60px" }, color: "#ffff" }}
        >
          POWER
        </Typography>
        <IconButton sx={{ width: { xs: "30px", sm: "60px" } }}>
          <img src={LogoDark} alt="NovaTechPower" style={{ width: "100%" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
