// import axios from "axios";
// import Swal from "sweetalert2";
// import Global from "../../Global";

// import { setError, setIsLoading, setIsLogged } from "../Slices/users";

// export const RegisterUser = (form) => {
//     return async (dispatch) => {
//       dispatch(setIsLoading(true));
//       return await axios
  
//         .post(Global.URL + "/register", form)
//         .then((data) => {
//           //console.log(data);
//           dispatch(setIsLoading(false));
//           Swal.fire({
//             icon: "success",
//             title: "Register OK!",
//             text: "Usuario registrado correctamente!",
//             confirmButtonText: "Continuar!",
//           }).then(async (response) => {
//             // await dispatch(setUserName(userData.userName));
//             await dispatch(setError())
//             await dispatch(setIsLogged(data.data.newToken));
//           });
//         })
//         .catch((response) => {
//           console.log(response);
//           dispatch(setIsLoading(false));
  
//           Swal.fire({
//             icon: "error",
//             title: response.response ? response.response.status : response.code,
//             text: response.response ? response.response.data : response.message,
//           });})}}

import axios from "axios";
import Swal from "sweetalert2";
import Global from "../../Global";
import { setIsLoading, setIsLog, setUserName } from "../Slices";

export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    return await axios

      .post(Global.URL + "/register", form)
      .then((data) => {
        console.log(data,data);
        dispatch(setIsLoading(false));
        const userData = {
          userId: data.data.id,
          userName: form.email,
          name: data.data.firstName,
          lastName: data.data.lastName,
          rol: data.data.rol,
          token: data.data.newToken,
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
