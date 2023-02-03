import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Global from "../../Global";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Thunks/getUser";
import { Container, Divider, Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import Box from "@mui/material/Box";

export const socket = io(Global.URL);

export default function Chat() {
  const dispatch = useDispatch();
  const { isLog } = useSelector((store) => store.users);
  const { avatar, firstName } = useSelector((store) => store.users);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(avatar);
  console.log(firstName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: firstName,
      avatar: avatar,
    };
    socket.emit("message", newMessage);
    setMessages([newMessage, ...messages]);
    setMessage("");
  };
  useEffect(() => {
    const receiveMessage = (message) => {
      console.log(message.from);
      setMessages([message.body, ...messages]);
    };
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);
  console.log(messages);
  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Happy chatting...!!!
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button>Send</button>
            </form>

            {messages.map((message, index) => {
              console.log(message);
              return (
                <div key={index}>
                  <p>
                    {message.from}: {message.body}
                  </p>
                </div>
              );
            })}
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}
