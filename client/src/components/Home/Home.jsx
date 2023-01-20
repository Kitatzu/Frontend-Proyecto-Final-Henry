import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function Home() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  return (
    <Box
      sx={{
        background: theme[mode].primary,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box sx={{ width: "calc(100% - 80px)" }}>
          <Cards />
        </Box>
      </Box>
    </Box>
  );
}
