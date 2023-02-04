import axios from "axios";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import Swal from "sweetalert2";
import {
  setUsers,
  setIsLoading,
  setUsersDeleted,
  setUserDetail,
  setData,
} from "../Slices/users";

export const getUser = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    await axios
      .get(Global.URL + "/users") //es un getAll
      .then((response) => {
        console.log(response.data);
        dispatch(setUsers(response.data));
        dispatch(setIsLoading(false));
      })
      .catch((response) => {
        console.log(response);
        alert(response.response.data.msg);
      });
  };
};
export const satusZero = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    await axios
      .get(Global.URL + "/users/status")
      .then((response) => {
        console.log(response.data);
        dispatch(setUsersDeleted(response.data));
        dispatch(setIsLoading(false));
      })
      .catch((response) => {
        console.log(response);
        alert(response.response.data.msg);
      });
  };
};
//TODO:PRUEBA
export const getUserA = (userId) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(`${Global.URL}/users/${userId}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setData(response.data));
        dispatch(setIsLoading(false));
      })
      .catch((e) => {
        console.log(e);
        Toast.fire({ icon: "error", title: "Internal server error!" });
      });
  };
};

export const userUpdate = (userId, form) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    return await axios({
      url: `${Global.URL}/users/${userId}`,
      method: "PUT",
      body: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    })
      .then((data) => {
        console.log(data);
        dispatch(setIsLoading(false));
        const userData = {
          email: data.data.email,
          country: data.data.country,
          city: data.data.city,
          phone: data.data.phone,
        };
        Swal.fire({
          icon: "success",
          title: "Actualizado!",
          text: "Usuario actualizado correctamente!",
          confirmButtonText: "Continuar!",
        }).then(async (response) => {
          await dispatch(setData(userData));
          await dispatch(setIsLoading(false));
          await dispatch(getUserA(userId));
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
