import Toast from "../../components/Toast/Toast";
import { setOneNotification } from "../../Redux/Slices";

let enter = 0;
export const getNotification = async (data) => {
  console.log("entra", enter++);
  return async (dispatch) => {
    const { type, notification } = JSON.parse(data);
    Toast.fire({ icon: type, title: notification });
    dispatch(setOneNotification({ type, notification }));
  };
};
