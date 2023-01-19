import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SideBar() {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      padding={"20px"}
      sx={{
        height: "calc(100vh - 64px)",
        width: "max-content",
        position: "relative",
        left: "0",
        background: "#0000",
      }}
    >
      <Box>
        <IconButton>
          <Icon icon="material-symbols:home-outline-rounded" />
        </IconButton>
        <Typography>Inicio</Typography>
      </Box>
    </Box>
  );
}
