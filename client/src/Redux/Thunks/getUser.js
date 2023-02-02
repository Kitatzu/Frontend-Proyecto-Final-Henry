import axios from "axios";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import {
  setUsers,
  setIsLoading,
  setUsersDeleted,
  setUserDetail,
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
        dispatch(setUserDetail(response.data));
        dispatch(setIsLoading(false));
      })
      .catch((e) => {
        console.log(e);
        Toast.fire({ icon: "error", title: "Internal server error!" });
      });
  };
};
