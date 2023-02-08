/* import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import io from "socket.io-client";
import Global from "../../Global";




const UsersConnected = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket =  io(Global.URL);;
    socket.on('connection', (socket) => {
      socket.on('user connected', (user) => {
        setUsers([...users, user]);
      });
    });
  }, [users]);

  return (
    <List>
      {users.map((user, index) => (
        <ListItem key={index}>
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  );
};

export default UsersConnected;
 */