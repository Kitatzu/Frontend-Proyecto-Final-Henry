import axios from "axios";
import Global from "../../Global";
import { setUsers,setIsLoading } from "../Slices/users";

export const getUser=()=>{
    return async(dispatch)=>{
        dispatch(setIsLoading(true))
        await axios.get(Global.URL + "/users")//es un getAll
        .then((response)=>{
            console.log(response.data);
            dispatch(setUsers(response.data))
            dispatch(setIsLoading(false))
        }).catch((response)=>{console.log(response);
        alert(response.response.data.msg)});
    };
};