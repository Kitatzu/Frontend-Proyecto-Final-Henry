import * as React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material"
import getUser from "../../Redux/Thunks/getUser"
import { useDispatch,useSelector } from 'react-redux';


export default function UsersTable() {
  const dispatch=useDispatch();
  const users=useSelector((store)=>store.users)
  useEffect(()=>{
    dispatch(getUser());
},[dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Datos de usuarios</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">firstName</TableCell>
            <TableCell align="right">lastName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((e) => (
            <TableRow
              key={e.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.name}
              </TableCell>
              <TableCell align="right">{e.userName}</TableCell>
              <TableCell align="right">{e.email}</TableCell>
              <TableCell align="right">{e.firstName}</TableCell>
              <TableCell align="right">{e.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}