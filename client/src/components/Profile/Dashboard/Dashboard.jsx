import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import SideBar from "../../SideBar/SideBar";
import Graphs from "./components/Graphs/Graphs";
import Utils from "./Utils/Utils";

const Dashboard = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary }}>
      <NavBar />
      <Box></Box>
      <Box display={"flex"}>
        <Box height="350px" mt="-20px" width={"100%"}>
          <Graphs />
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
