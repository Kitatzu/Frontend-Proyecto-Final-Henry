import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

export default function SideBar() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
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
        background: theme[mode].sidebar,
        color: theme[mode].textPrimary,
      }}
      gap="20px"
    >
      <Box>
        <Box>
          <IconButton>
            <Icon
              icon="material-symbols:home-outline-rounded"
              color={theme[mode].textPrimary}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <Icon
              icon="material-symbols:monitor-outline-rounded"
              color={theme[mode].textPrimary}
            />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Box>
          <IconButton>
            <Icon
              icon="material-symbols:shopping-cart-outline-rounded"
              color={theme[mode].textPrimary}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <Icon
              icon="vscode-icons:file-type-light-config"
              color={theme[mode].textPrimary}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
