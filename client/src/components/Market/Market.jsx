import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function Market() {
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
      <SideBar />
    </Box>
  );
}
