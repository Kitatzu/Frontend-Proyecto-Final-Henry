import axios from "axios";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import { setAllNotifications } from "../Slices";

export const getNotifications = () => {
  return async (dispatch) => {
    await axios
      .get(Global.URL + "/notification")
      .then((response) => {
        dispatch(setAllNotifications(response.data));
      })
      .catch((e) => {
        Toast.fire({ icon: "error", title: "Internal server error!" });
      });
  };
};

export const deleteNotifications = () => {
  return async (dispatch) => {
    await axios
      .delete(Global.URL + "/notification")
      .then((response) => {
        console.log(response);
        dispatch(setAllNotifications([]));
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({ icon: "error", title: "Internal server error!" });
      });
  };
};
