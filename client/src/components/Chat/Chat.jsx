import React, { Fragment, useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import io from "socket.io-client";
import Global from "../../Global";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Container,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ChatIcon from "@mui/icons-material/Chat";
import "./Chat.css";
import Bar from "../Bar/Bar";
import { convertLength } from "@mui/material/styles/cssUtils";
import UsersConnected from "./UsersConnected";

export const socket = io(Global.URL);
const useChatStyles = makeStyles((theme) => ({
  otherMessageText: {
    color: "black",
    backgroundColor: "white",
    textAlign: "left",
    borderRadius: "10px",
    width: "fit-content",
  },
  userMessageText: {
    color: "black",
    backgroundColor: "#CDFAB9",
    textAlign: "right",
    borderRadius: "10px",
    width: "fit-content",
  },
  userBox: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#FFEDD4",
  },
  otherBox: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#FFEDD4",
  },
  date: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#184FF5",
    color: "white",
    borderRadius: "10%",
  },
}));

export default function Chat() {
  const classes = useChatStyles();
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { isLog } = useSelector((store) => store.users);
  const { avatar, firstName } = useSelector((store) => store.users);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const scrollBottomRef = useRef(null);
  const ENTER_KEY_CODE = 13;

  let userName = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userName
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      content: message,
      user: { userName, avatar },
      createdAt: new Date(),
    };
    socket.emit("message", newMessage);
    console.log(newMessage);
    setMessages([...messages, newMessage]);
    console.log(messages);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };
    const getMessages = (allMessages) => {
      setMessages(allMessages);
    };
    socket.on("message", receiveMessage);
    if (messages.length === 0) {
      socket.emit("get messages");
    }

    socket.on("get messages", getMessages);
    return () => {
      socket.off("message", receiveMessage);
      socket.off("get messages");
    };
  }, [messages]);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(date).toLocaleDateString("es-ES", options);
    return formattedDate;
  };
  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric" };
    const formattedTime = new Date(date).toLocaleTimeString("es-ES", options);
    return formattedTime;
  };

  const listChatMessages = messages.map((message, index) => {
    let showDate = false;
    if (index === 0) {
      showDate = true;
    } else {
      const previousMessage = messages[index - 1];
      const currentMessageDate = new Date(message.createdAt).toDateString();
      const previousMessageDate = new Date(
        previousMessage.createdAt
      ).toDateString();

      if (currentMessageDate !== previousMessageDate) {
        showDate = true;
      }
    }
    return (
      <React.Fragment key={index}>
        {showDate && (
          <ListItem>
            <ListItemText
              primary={`${formatDate(message.createdAt)}`}
              className={classes.date}
            />
          </ListItem>
        )}
        <ListItem
          key={index}
          className={
            message.user.userName === userName
              ? classes.userBox
              : classes.otherBox
          }
        >
          <ListItemAvatar>
            <Avatar src={message.user.avatar} secondary={firstName} />
          </ListItemAvatar>
          <Box>
            <ListItemText
              primary={`${message.content}`}
              secondary={`${formatTime(message.createdAt)}`}
              className={
                message.user.userName === userName
                  ? classes.userMessageText
                  : classes.otherMessageText
              }
              sx={{ padding: "8px" }}
            />
          </Box>
        </ListItem>
      </React.Fragment>
    );
  });

  const handleEnterKey = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      handleSubmit(e);
    }
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Fragment>
      <ChatIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "63%",
            height: "100%",
          }}
        >
          <Container >
            <Bar />
            <Paper id="chat-window" elevation={22} sx={{
                  background: theme[mode].primary,
                }}>
               <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: { xs: "30px", sm: "40px" },
                      fontWeight: 800,
                      color: "#308FFD",
                    }}
                    component="h1"
                  >
                    NOVA
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "30px", sm: "40px" },
                      fontWeight: 600,
                      color: theme[mode].textPrimary,
                    }}
                    component="h1"
                  >
                    CHAT
                  </Typography>
                </Box>
              <Box 
                p={3}
                sx={{
                  background: theme[mode].primary,
                }}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
              >

                <Divider />
                <List id="chat-window">
                  <UsersConnected />
                </List>
                <Grid container spacing={4} alignItems="center">
                  <Grid id="chat-window" xs={12} item>
                    <List
                      id="chat-window-messages"
                      sx={{ color: theme[mode].textPrimary }}
                    >
                      {listChatMessages}
                      <ListItem ref={scrollBottomRef}></ListItem>
                    </List>
                  </Grid>
                  <Grid xs={2} item>
                    <FormControl fullWidth>
                      <TextField
                        onChange={handleUserChange}
                        value={firstName}
                        /* color="primary" */
                        sx={{ width: "80px" }}
                        focused
                        InputProps={{
                          style: {
                            backgroundColor: "#184FF5",
                            color: "white",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={9} item>
                    <FormControl fullWidth>
                      <TextField
                        onChange={handleMessageChange}
                        onKeyDown={handleEnterKey}
                        value={message}
                        label="Escribe tu mensaje"
                        variant="outlined"
                        sx={{ width: "325px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={1} item>
                    <IconButton
                      onClick={handleSubmit}
                      aria-label="send"
                      color="primary"
                    >
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </div>
      </Modal>
    </Fragment>
  );
}
