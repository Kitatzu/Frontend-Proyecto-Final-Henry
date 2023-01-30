import axios from "axios";
import Global from "../../Global";
import { TextField,Button } from "@mui/material";
import { useState } from "react";
import Toast from "../Toast/Toast"



export default function VerifCode(){
const[tiping,setTiping]=useState("");

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
    <div>
<TextField value={tiping} placeholder="ingrese codigo..." onChange={e=>handlerInputChange(e)}/>
<br></br>
<Button value="verif" onClick={e=>handleSubmit(e)} variant="contained">Verificar</Button>
</div>
)
}
