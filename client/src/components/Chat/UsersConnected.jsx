import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "250px",
    height: "100%",
    backgroundColor: "#eee",
    overflowY: "auto",
  },
});

const UsersConnected = () => {
  const classes = useStyles();
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const connectedUsers = [
    "Exequiel",
    "Jhonatan",
    "Javier",
    "Marcial",
    "Santiago",
    "Vania",
    "Carlos",
    "José María",
    "PO",
   
  ];
  return (
    <Grid container spacing={4} alignItems="center">
      <List
        className={classes.root}
        id="chat-window-messages"
        sx={{ color: theme[mode].textPrimary }}
      >
        {connectedUsers.map((username) => (
          <ListItem key={username}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={username} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default UsersConnected;
