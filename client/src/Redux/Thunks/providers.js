import axios from "axios";
import Swal from "sweetalert2";
import Global from "../../Global";
import { setProvider } from "../Slices";

export const getProviders = () => {
  return async (dispatch) => {
    await axios
      .get(`${Global.URL}/providers`)
      .then((response) => {
        console.log(response);
        dispatch(setProvider(response.data.Providers));
      })
      .catch((response) => {
        console.log(response);
        Swal.fire({
          icon: "error",
          title: response.response.data.Message,
        });
      });
  };
};
