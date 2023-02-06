import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem
} from "@mui/material";
import { getUser,satusZero } from "../../../../Redux/Thunks/getUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUser());
    return()=>{
      dispatch(getUser());
    }
  }, [dispatch]);

const [status,setStatus]=useState("0");
;

function handlerSelect(event){
setStatus(event.target.value)
if(status==="0"){
  dispatch(satusZero());
  console.log(status)
}else{
  dispatch(getUser());
  console.log(status)
}
/* setAux("") */
}
  return (
    <TableContainer component={Paper}>
      <Select value={status}  onChange={e=>handlerSelect(e)}>
         <MenuItem value={"0"}>Usuario activo</MenuItem>
         <MenuItem value={"1"}>Usuario eliminado</MenuItem>
      </Select>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
           {/*  <TableCell align="center">UserName</TableCell> */}
            <TableCell align="center">email</TableCell>
            <TableCell align="center">firstName</TableCell>
            <TableCell align="center">lastName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users !== false
            ? users.map(
                (
                  e //si no hay datos ignora el map y manda vacio
                ) => (
                  <TableRow
                    key={e.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  {/*   <TableCell align="center">{e.userName}</TableCell> */}
                    <TableCell align="center">{e.email}</TableCell>
                    <TableCell align="center">{e.firstName}</TableCell>
                    <TableCell align="center">{e.lastName}</TableCell>
                  </TableRow>
                )
              )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
