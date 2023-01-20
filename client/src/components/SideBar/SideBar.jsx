import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SideBar() {
  return (
    <Box
      display={{ xs: "none", sm: "flex" }}
      flexDirection="column"
      justifyContent={"space-between"}
      padding={"20px"}
      sx={{
        height: "calc(100vh - 64px)",
        width: "max-content",
        position: "relative",
        left: "0",
        background: "white",
      }}
      gap="20px"
    >
      <Box>
        <Box>
          <IconButton>
            <Icon icon="material-symbols:home-outline-rounded" />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <Icon icon="material-symbols:monitor-outline-rounded" />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Box>
          <IconButton>
            <Icon icon="material-symbols:shopping-cart-outline-rounded" />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <Icon icon="vscode-icons:file-type-light-config" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
