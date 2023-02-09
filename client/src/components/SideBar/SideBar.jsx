import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLog, setUserName } from "../../Redux/Slices";

export default function SideBar() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { isLog } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(" ");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
    if (JSON.parse(localStorage.getItem("token"))?.rol === "Admin") {
      setAdmin("1");
    } else {
      setAdmin("0");
    }
  }, [dispatch]);
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
        boxShadow: "4px 0px 4px rgba(0, 0, 0, 0.25)",
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
            {admin === "1" ? (
              <IconButton>
                <Link to={"/dashboard"}>
                  <Icon
                    icon="vscode-icons:file-type-light-config"
                    color={theme[mode].textPrimary}
                  />
                </Link>
              </IconButton>
            ) : null}
          </Box>
          <Box>
            <IconButton>
              <Link to={"/invoices"}>
                <Icon icon="uil:invoice" color={theme[mode].textPrimary} />
              </Link>
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <Link to={"/chat"}>
                <Icon icon="material-symbols:chat" />
              </Link>
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
