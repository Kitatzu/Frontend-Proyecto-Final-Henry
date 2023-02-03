import React, { Fragment, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Global from "../../Global";
import { useDispatch, useSelector } from "react-redux";
import {
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
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ChatIcon from "@mui/icons-material/Chat";
import "./Chat.css";
import NavBar from "../NavBar/NavBar";

export const socket = io(Global.URL);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Chat() {
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
  const [user, setUser] = useState(firstName);
  const scrollBottomRef = useRef(null);
  const ENTER_KEY_CODE = 13;
  console.log(avatar);
  console.log(firstName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      user: firstName,
      avatar: avatar,
    };
    socket.emit("message", newMessage);
    setMessages([newMessage, ...messages]);
    setMessage("");
  };
  useEffect(() => {
    const receiveMessage = (message) => {
      console.log(message.user);
      setMessages([message.body, ...messages]);
      if (scrollBottomRef.current) {
        scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);
  console.log(messages);

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const listChatMessages = messages.map((message, index) => (
    <ListItem key={index}>
      <ListItemText primary={`${message.user}:${message.body}`} />
    </ListItem>
  ));

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
      >
        <Container>
          <NavBar />
          <Paper elevation={5}>
            <Box
              p={3}
              sx={{
                background: theme[mode].primary,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: theme[mode].textPrimary, padding: "20px" }}
              >
                Conversa con los especialistas...!!!
              </Typography>
              <Divider />
              <Grid container spacing={4} alignItems="center">
                <Grid id="chat-window" xs={12} item>
                  <List
                    id="chat-window-messages"
                    sx={{ color: theme[mode].textPrimary, padding: "20px" }}
                  >
                    {listChatMessages}
                    <ListItem ref={scrollBottomRef}></ListItem>
                  </List>
                </Grid>
                <Grid xs={2} item>
                  <FormControl fullWidth>
                    <TextField
                      onChange={handleUserChange}
                      value={message.user}
                      label={user}
                      variant="outlined"
                      disabled                    
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
      </Modal>
    </Fragment>
  );
}
