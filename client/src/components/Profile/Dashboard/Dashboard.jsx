import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import NavBar from "../../NavBar/NavBar";
import Graphs from "./components/Graphs/Graphs";
import Sidebar from "./Utils/global/Sidebar";
import ProgressCircle from "./components/ProgressCircle";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../../../socket/socket";
import { Icon } from "@iconify/react";
import { Link, Navigate } from "react-router-dom";
const Dashboard = () => {
  const [realProgress, setRealProgress] = useState(0.0);
  const [reward, setReward] = useState(0.0);
  const [users, setUsers] = useState(0);
  const [sold, setSold] = useState(false);
  const { isLog } = useSelector((store) => store.users);
  useEffect(() => {
    if (realProgress === 0.0) {
      socket.emit("getDataSold");
    }
    if (users === 0) {
      socket.emit("getSumUsers");
    }
    if (!sold) {
      socket.emit("getProductSold");
    }
    socket.on("getProductSold", (data) => {
      setSold(data);
    });
    socket.on("sumUsers", (data) => {
      if (data) setUsers(data);
    });
    socket.on("DataSold", (data) => {
      setRealProgress(data.promedio);
      setReward(data.suma);
    });
    return () => {
      socket.off("DataSold", (data) => {
        setRealProgress(data.promedio);
        setReward(data.suma);
      });
      socket.off("sumUsers", (data) => {
        if (data) setUsers(data);
      });
      socket.off("getProductSold", (data) => {
        setSold(data);
      });
    };
  }, [realProgress, users, sold]);
  console.log(sold);
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary }}>
      {!isLog && <Navigate to="/home" />}
      <NavBar />
      <Box display={"flex"} minHeight="1000px">
        <Sidebar />
        <Box
          display="flex"
          width="100%"
          flexWrap={"wrap"}
          flexDirection="column"
        >
          <Box width="100%" padding="20px" height={"max-content"}>
            <Box
              width="100%"
              display="flex"
              justifyContent={"center"}
              alignItems="center"
              gap="20px"
            >
              <Typography
                fontSize={"24px"}
                fontWeight={800}
                sx={{ color: "#1976D2" }}
              >
                META:
              </Typography>
              <Typography
                fontSize={"24px"}
                sx={{ color: Theme[mode].textPrimary }}
              >
                2800$
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={"24px"}
                fontWeight={800}
                sx={{ color: "#1976D2" }}
              >
                TOTAL FACTURADO: {reward}$
              </Typography>
            </Box>
          </Box>

          <Box
            flexGrow={1}
            display="flex"
            justifyContent={"space-around"}
            padding="20px"
            alignItems={"center"}
          >
            <Box
              padding={"40px"}
              display="flex"
              flexDirection={"column"}
              sx={{
                background: "rgba(255,255,255,.05)",
                borderRadius: "4px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderTop: Theme.mode === "dark" ? "8px solid #4EEB0D" : "none",
              }}
            >
              <Typography
                width={"100%"}
                textAlign="center"
                fontSize="20px"
                sx={{ color: Theme[mode].textPrimary }}
              >
                Usuarios registrados.
              </Typography>
              <IconButton>
                <Link to="/dashboard/users">
                  <Icon
                    icon="mdi:users-group"
                    width="200"
                    height="200"
                    color="#1976D2"
                  />
                </Link>
              </IconButton>
              <Typography
                width={"100%"}
                textAlign="center"
                fontSize="20px"
                sx={{ color: Theme[mode].textPrimary }}
              >
                {users}
              </Typography>
            </Box>
            <Box
              padding={"40px"}
              sx={{
                background: "rgba(255,255,255,.2)",
                borderRadius: "4px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderTop: Theme.mode === "dark" ? "8px solid #4EEB0D" : "none",
              }}
            >
              <ProgressCircle realProgress={realProgress} size="200" />
              <Typography
                sx={{
                  padding: "20px 0px",
                  color: Theme[mode].textPrimary,
                  textAlign: "center",
                  width: "100%",
                  fontSize: "24px",
                }}
              >
                Total del mes
              </Typography>
            </Box>
          </Box>
          <Box height="350px" mt="-20px" width={"100%"} flexGrow="1">
            {sold ? <Graphs data={sold} /> : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
