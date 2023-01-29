import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import SideBar from "../../SideBar/SideBar"
import Graphs from "./Graphs/Graphs";
import Utils from "./Utils/Utils";

const Dashboard = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary}}>
      <NavBar />
      <Box></Box>
      <Box display={"flex"}>
        <SideBar />
        <Box
            sx={{
              height: "calc(100vh - 64px)",
              width: { xs: "100%", sm: "calc(100% - 80px)" },
              display: "flex",
              flexDirection: "column",
              padding: { xs: "10px", sm: "20px" },
              overflow: "scroll",
            }}
          >
            <Box display={"flex"} flexWrap="wrap">
            {/* //TODO:PLOTLY */}
            <Graphs />
            <Utils />
        </Box>
          </Box>
        
      </Box>
      
    </Box>
  );
};
export default Dashboard;
