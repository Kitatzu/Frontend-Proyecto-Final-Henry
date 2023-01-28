import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import Graphs from "./Graphs/Graphs";
import Utils from "./Utils/Utils";

const Dashboard = () => {
  return (
    <Box minHeight={"100vh"}>
      <NavBar />
      <Box></Box>
      <Box display={"flex"} flexWrap="wrap">
        {/* //TODO:PLOTLY */}
        <Graphs />
        <Utils />
      </Box>
    </Box>
  );
};
export default Dashboard;
