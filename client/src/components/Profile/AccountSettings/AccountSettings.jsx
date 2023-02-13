import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import NavBar from "../../NavBar/NavBar";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { useState } from "react";
import Seguridad from "./Seguridad/Seguridad";
import { useSelector } from "react-redux";
import SideBar from "../../SideBar/SideBar";
import Loading from "../../Loading/Loading";
const AccountSettings = () => {
  const [setting, setSetting] = useState("Perfil");
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  const userLoading = useSelector((store) => store.users.isLoading);
  return (
    <div
      className="Account"
      style={{ background: Theme[mode].primary, minHeight: "100vh" }}
    >
      <NavBar />
      {userLoading ? (
        <Loading />
      ) : (
        <Box display={"flex"}>
          <SideBar />
          <Box
            sx={{
              height: "calc(100vh - 64px)",
              width: { xs: "100%", sm: "calc(100% - 80px)" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "scroll",
              padding: "10px",
            }}
          >
            <Box>
              <h2 style={{ color: Theme[mode].textPrimary }}>Settings</h2>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", sm: "max-content" },
                minWidth: "300px",
              }}
            >
              <ul
                className="Account-links"
                style={{ display: "flex", gap: "20px" }}
              >
                <li>
                  <Button
                    startIcon={<Icon icon="mdi:user" />}
                    onClick={() => setSetting("Perfil")}
                    sx={{ color: Theme[mode].textPrimary }}
                  >
                    Perfil
                  </Button>
                </li>
                <li>
                  <Button
                    startIcon={<Icon icon="mdi:account-security" />}
                    onClick={() => setSetting("Seguridad")}
                    sx={{ color: Theme[mode].textPrimary }}
                  >
                    Seguridad
                  </Button>
                </li>
              </ul>
              <Box marginBottom={"90px"}>
                {setting === "Perfil" && <ProfileSettings />}
                {setting === "Seguridad" && <Seguridad />}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};
export default AccountSettings;
