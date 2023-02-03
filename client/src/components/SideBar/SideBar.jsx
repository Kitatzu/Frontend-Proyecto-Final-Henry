import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setIsLog, setUserName } from "../../Redux/Slices";

export default function SideBar() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { isLog } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("token")));
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
  }, []);
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
            <Link to={"/home"}>
              <Icon
                icon="material-symbols:home-outline-rounded"
                color={theme[mode].textPrimary}
              />
            </Link>
          </IconButton>
        </Box>
      </Box>
      {isLog && (
        <Box>
          <Box>
            <IconButton>
              <Link to={"/cart"}>
                <Icon
                  icon="material-symbols:shopping-cart-outline-rounded"
                  color={theme[mode].textPrimary}
                />
              </Link>
            </IconButton>
          </Box>

          <Box>
            <IconButton>
              <Link to={"/dashboard"}>
                <Icon
                  icon="vscode-icons:file-type-light-config"
                  color={theme[mode].textPrimary}
                />
              </Link>
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
