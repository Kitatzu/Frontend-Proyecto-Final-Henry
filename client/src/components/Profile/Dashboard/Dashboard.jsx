import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";

import Graphs from "./components/Graphs/Graphs";

import Sidebar from "./Utils/global/Sidebar";
import ProgressCircle from "./components/ProgressCircle";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary }}>
      <NavBar />
      <Box display={"flex"} minHeight="1000px">
        <Sidebar />
        <Box
          display="flex"
          width="100%"
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          <Box
            flexGrow={1}
            display="flex"
            justifyContent={"space-around"}
            padding="20px"
            alignItems={"center"}
          >
            <Box
              padding={"40px"}
              sx={{
                background: "rgba(255,255,255,.2)",
                borderRadius: "4px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ProgressCircle progress="0.10" size="100" />
              <Typography sx={{ padding: "20px 0px" }}>Meta del mes</Typography>
            </Box>
            <Box
              padding={"40px"}
              sx={{
                background: "rgba(255,255,255,.2)",
                borderRadius: "4px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ProgressCircle progress="0.30" size="100" />
              <Typography
                sx={{
                  padding: "20px 0px",
                }}
              >
                Meta del mes
              </Typography>
            </Box>
            <Box
              padding={"40px"}
              sx={{
                background: "rgba(255,255,255,.2)",
                borderRadius: "4px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ProgressCircle progress="0.50" size="100" />
              <Typography sx={{ padding: "20px 0px" }}>Meta del mes</Typography>
            </Box>
          </Box>
          <Box height="350px" mt="-20px" width={"100%"} flexGrow="1">
            <Graphs />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
