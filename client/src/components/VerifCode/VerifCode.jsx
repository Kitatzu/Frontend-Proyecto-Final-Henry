import axios from "axios";
import Global from "../../Global";
import NavBar from "../NavBar/NavBar";
import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toast from "../Toast/Toast"

export default function VerifCode(){

const[tiping,setTiping]=useState("");
const mode = useSelector((store) => store.theme.mode);
const theme = useSelector((store) => store.theme);


async function aux(id,code){
    try {
        await axios.put(Global.URL + "/verification",{id,code});
   /*  alert("Cuenta verificada") */
    Toast.fire({icon:"success",title:"Cuenta Verificada"})
    } catch (error) {
        /* alert("Codigo incorrecto") */
        Toast.fire({icon:"error",title:"Código incorrecto"})
    }
}
const id =JSON.parse(localStorage.getItem("token"))?JSON.parse(localStorage.getItem("token")).userId:null

function handlerInputChange(event){
    event.preventDefault();
    setTiping(event.target.value);
};
function handleSubmit(event){
    event.preventDefault();
    aux(id,tiping)
    setTiping("");
}
return(
    <Box>
        <NavBar/>
        <Box 
        display={"flex"}    
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        sx={{
            background: theme[mode].primary,
            height: "100vh",
            overflow: "hidden",
        }}
        >
            
            <TextField value={tiping} placeholder="ingrese codigo..." onChange={e=>handlerInputChange(e)} sx={{ background:"white" }}/>
            <br></br>
            <Button 
            value="verif" 
            onClick={e=>handleSubmit(e)} 
            variant="contained"
            >Verificar</Button>
            <Link to="/home">
                <Button 
                    sx={{ padding: "2rem" }}
                >Regresar</Button>
            </Link>
            
        </Box>
    </Box>
    
)
}
