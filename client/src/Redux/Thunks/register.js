import axios from "axios";
import Swal from "sweetalert2";
import Global from "../../Global";
import { socket } from "../../socket/socket";
import { setIsLoading, setIsLog, setUserName } from "../Slices";

export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    return await axios({
      url: `${Global.URL}/register`,
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    })
      .then((data) => {
        dispatch(setIsLoading(false));
        const userData = {
          userId: data.data.id,
          userName: data.data.userName,
          email: data.data.email,
          name: data.data.firstName,
          lastName: data.data.lastName,
          avatar: form.avatar,
          token: data.data.token,
          rol: data.data.rol,
        };
        localStorage.setItem("token", JSON.stringify(userData));
        Swal.fire({
          icon: "success",
          title: "Register OK!",
          text: "Usuario registrado correctamente!",
          confirmButtonText: "Continuar!",
        }).then(async (response) => {
          await dispatch(setUserName(userData.userName));
          await dispatch(setIsLog(data.data.newToken));
          socket.emit("sendSumUsers");
        });
      })
      .catch((response) => {
        console.log(response);
        dispatch(setIsLoading(false));

        Swal.fire({
          icon: "error",
          title: response.response ? response.response.status : response.code,
          text: response.response ? response.response.data : response.message,
        });
      });
  };
};
