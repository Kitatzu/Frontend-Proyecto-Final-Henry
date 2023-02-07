import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";

import Graphs from "./components/Graphs/Graphs";

import Sidebar from "./Utils/global/Sidebar";

const Dashboard = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary }}>
      <NavBar />
      <Box></Box>
      <Box display={"flex"}>
        <Sidebar />

        <Box height="350px" mt="-20px" width={"100%"}>
          <Graphs />
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
