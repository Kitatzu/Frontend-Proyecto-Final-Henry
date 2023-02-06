import axios from "axios";
import Global from "../../Global";
import Swal from "sweetalert2";
import { setCategories } from "../Slices";

export const getCategories = () => {
  return async (dispatch) => {
    await axios
      .get(Global.URL + "/categories")
      .then((response) => {
        // Swal.fire({
        //   icon: "success",
        //   title: "Success",
        // });
        dispatch(setCategories(response.data.Categories));
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
