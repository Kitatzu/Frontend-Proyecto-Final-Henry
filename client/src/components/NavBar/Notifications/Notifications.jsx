import {
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import Global from "../../../Global";

import { setAllNotifications } from "../../../Redux/Slices";

import {
  deleteNotifications,
  getNotifications,
} from "../../../Redux/Thunks/Notifications";
import Toast from "../../Toast/Toast";

const socket = io(Global.URL);

export default function Notifications() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
    socket.on("notification", (data) => {
      Toast.fire({
        icon: data.newNotification.type,
        title: data.newNotification.notify,
      });
      dispatch(setAllNotifications(data.findNotifications));
    });
    return () =>
      socket.off("notification", (data) => dispatch(setAllNotifications(data)));
  }, []);

  //TODO:CONTROLSNAV
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  //TODO:CONTROLSNAV
  const { notifications } = useSelector((store) => store.notification);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <Badge
          badgeContent={notifications ? notifications.length : 0}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", sm: "none", md: "none" },
        }}
      >
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", sm: "block" },
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button>{page.notify}</Button>
                </Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Typography textAlign="center">
                <Button>No hay notificaciones!</Button>
              </Typography>
            </MenuItem>
          )}
          <MenuItem>
            <Typography color={"secondary"}>
              <Button
                color="secondary"
                onClick={() => dispatch(deleteNotifications())}
              >
                Borrar todo...
              </Button>
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
