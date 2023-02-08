import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

/* import Notifications from "../../"; */
import { Avatar } from "@mui/material";
import MuiSwitch from "../MuiSwitch/MuiSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../Redux/Slices";
import { getUserA } from "../../Redux/Thunks/getUser";
import LogoNova from "../assets/LogoDark.png";
export default function NavBar() {
  // const url = window.location.href.split("/")[3].toLowerCase();
  // const urlRoute = window.location.href.split("/")[4];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { isLog } = useSelector((store) => store.users);
  const pages = ["home", "dashboard", "cart"];
  const { avatar, firstName } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };
  //FIXME: PETICION CON USEEFFECT

  const userId = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userId
    : null;


  useEffect(() => {
    if (userId) {
      dispatch(getUserA(userId));
    }
    //TODO: DISPATCH A THUNK GETUSERA
  }, []);

  //FIXME: PETICION CON USEEFFECT

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/account" style={{ color: "black" }}>
          {" "}
          Perfil{" "}
        </Link>
      </MenuItem>
      {isLog && (
        <MenuItem onClick={logOut} style={{ color: "black" }}>
          {" "}
          Log out{" "}
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <MuiSwitch />
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
                display: { xs: "block", sm: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/" + page}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <IconButton
            sx={{
              display: { xs: "none", sm: "block" },
              width: "40px",
              height: "40px",
            }}
          >
            <Link to={"/home"}>
              <img src={LogoNova} alt="nova" style={{ width: "100%" }} />
            </Link>
          </IconButton>

          {/*  <Box display={{ xs: "none", sm: "flex" }}>
            {url === "home" && (urlRoute === "" || urlRoute === undefined) ? (
              <SearchBar />
            ) : null}
          </Box> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ alignItems: "center" }}>
            <MuiSwitch />
            <Box display={{ xs: "inline-block", md: "inline-block" }}>
              {/*  <Notifications /> */}
            </Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/**FIXME: src = avatar de store.users */}
              <Avatar src={avatar} alt={firstName} />
              {/**FIXME: src = avatar de store.users */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
