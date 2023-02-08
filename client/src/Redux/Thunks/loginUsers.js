import axios from "axios";
import Swal from "sweetalert2";
import Global from "../../Global";
import { socket } from "../../socket/socket";
import { setData, setIsLoading, setIsLog, setUserName } from "../Slices";
export const loginUser = (origin, form, Token) => {
  return async (dispatch) => {
    if (origin === "local") {
      await dispatch(setIsLoading(true));
      await axios
        .post(Global.URL + "/login", form)
        .then((data) => {
          console.log(data);
          const userData = {
            userId: data.data.id,
            userName: data.data.userName,
            email: data.data.email,
            name: data.data.firstName,
            lastName: data.data.lastName,
            avatar: form.avatar,
            token: data.data.token,
            rol: data.data.role.rol,
          };
          localStorage.setItem("token", JSON.stringify(userData));
          dispatch(setIsLoading(false));
          Swal.fire({
            icon: "success",
            title: "Login Ok!",
            text: "Usuario Logeado correctamente!",
          }).then(async (response) => {
            await dispatch(setUserName(form.email));
            await dispatch(setIsLog(data.data.newToken));
          });
        })
        .catch((response) => {
          console.log(response);
          dispatch(setIsLoading(false));
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Error usuario o contraseña invalidos",
          });
          //console.log(response);
        });
    } else if (origin === "google") {
      await dispatch(setIsLoading(true));
      console.log(form);
      await axios
        .get(Global.URL + "/users?email=" + form.email)
        .then((data) => {
          console.log(data);
          const userData = {
            userId: data.data.id,
            userName: data.data.userName,
            email: data.data.email,
            name: data.data.firstName,
            lastName: data.data.lastName,
            avatar: form.avatar,
            token: data.data.token,
            rol: data.data.role.rol,
          };
          localStorage.setItem("token", JSON.stringify(userData));
          dispatch(setIsLoading(false));
          Swal.fire({
            icon: "success",
            title: "Login Ok!",
            text: "Usuario Logeado correctamente!",
          }).then(async (response) => {
            await dispatch(setUserName(form.email));
            await dispatch(
              setData({
                avatar: form.avatar,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                email: data.data.email,
              })
            );
            await dispatch(setIsLog(Token));
          });
        })
        .catch(async (response) => {
          console.log(response);
          dispatch(setIsLoading(true));
          return await axios

            .post(Global.URL + "/register", form)
            .then((data) => {
              console.log(data, form);
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
                await dispatch(setUserName(form.userName));
                await dispatch(setIsLog(data.data.newToken));
                await dispatch(
                  setData({
                    avatar: data.data.avatar,
                    firstName: data.data.firstName,
                    lastName: data.data.lastName,
                    email: data.data.email,
                  })
                );
                socket.emit("sendSumUsers");
              });
            })
            .catch((response) => {
              console.log(response);
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error no se registro el usuario!",
              });
              dispatch(setIsLoading(false));
              console.log(response);
            });
        });
    }
  };
};
