import { AppBar, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "../Chat/Chat";
import NavBar from "../NavBar/NavBar";

const Bar = () => {
  return (
    <Fragment>
      <Box mb={4}>
        <NavBar />
      </Box>
      <div>
        <Chat />
      </div>
    </Fragment>
  );
};

export default Bar;
