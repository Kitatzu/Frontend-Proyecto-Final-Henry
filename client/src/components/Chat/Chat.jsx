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
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

import "./Chat.css";

import UsersConnected from "./UsersConnected";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import AppBar from "../AppBar/AppBar";
import StyledBadge from "../../utils/StyledBadge/StyledBadge";

export const socket = io(Global.URL);
const useChatStyles = makeStyles((theme) => ({
  otherMessageText: {
    color: "black",
    backgroundColor: "white",
    textAlign: "left",
    borderRadius: "10px",
    width: "100%",
  },
  userMessageText: {
    color: "black",
    backgroundColor: "#CDFAB9",
    textAlign: "right",
    borderRadius: "10px",
    width: "100%",
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
    backgroundColor: "#1976D2",
    color: "white",
    borderRadius: "4px",
  },
}));

export default function Chat() {
  const classes = useChatStyles();
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { isLog } = useSelector((store) => store.users);
  const { avatar, firstName } = useSelector((store) => store.users);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
      <Box key={index} sx={{ background: "black" }}>
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
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={message.user.userName} src={message.user.avatar} />
            </StyledBadge>
          </ListItemAvatar>
          <Box>
            <Box>
              <Typography
                width={"100px"}
                sx={{ overflow: "hidden", color: "#565656" }}
                height="20px"
              >
                {message.user.userName}
              </Typography>
            </Box>
            <ListItemText
              primary={`${message.content}`}
              secondary={`${formatTime(message.createdAt)}`}
              className={
                message.user.userName === userName
                  ? classes.userMessageText
                  : classes.otherMessageText
              }
              sx={{ padding: "8px", width: "100%", minWidth: "100px" }}
            />
          </Box>
        </ListItem>
      </Box>
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
    <Box width="100%" sx={{ background: theme[mode].primary }}>
      <NavBar />

      <Box display="flex" sx={{ background: theme[mode].primary }}>
        <SideBar />
        {!isLog ? (
          <Box width="100%">
            <Alert severity="warning">No estas registrado!</Alert>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              height: "calc(100vh - 64px)",
              overflow: "scroll",
              background: theme[mode].primary,
            }}
            marginBottom={{ xs: "80px", md: "0px" }}
            className="container"
          >
            <Box width="100%">
              <Typography variant="h3" sx={{ padding: "20px" }}>
                Chat Grupal
              </Typography>
              <Box
                display="flex"
                width={"100%"}
                padding={{ xs: "10px", md: "20px" }}
                justifyContent={"space-between"}
              >
                <Box
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                >
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

                <Typography
                  sx={{
                    fontSize: { xs: "20px", sm: "30px" },
                    fontWeight: 600,
                    color: theme[mode].textPrimary,
                  }}
                  component="h1"
                >
                  @{firstName}
                </Typography>
              </Box>
              <Box
                sx={{
                  background: theme[mode].primary,
                }}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap="0px"
                padding={{ xs: "none", md: "20px" }}
                minWidth="100px !important"
              >
                <Box flexGrow={1}>
                  <Box>
                    <List
                      id="chat-window-messages"
                      sx={{ color: theme[mode].textPrimary }}
                    >
                      {listChatMessages}
                      <ListItem ref={scrollBottomRef}></ListItem>
                    </List>
                  </Box>

                  <Box
                    width={"100%"}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    gap={"20px"}
                    padding="10px"
                    sx={{
                      background: mode === "dark" ? "#FFEDD4" : "none",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <TextField
                      onChange={handleMessageChange}
                      onKeyDown={handleEnterKey}
                      value={message}
                      label="Escribe tu mensaje"
                      variant="outlined"
                      sx={{ flexGrow: 1 }}
                    />

                    <IconButton
                      onClick={handleSubmit}
                      aria-label="send"
                      color="primary"
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <AppBar />
    </Box>
  );
}
