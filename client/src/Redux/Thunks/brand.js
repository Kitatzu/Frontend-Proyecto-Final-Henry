import axios from "axios";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import { setBrand } from "../Slices/Brands";
export const getBrands = () => {
  return async (dispatch) => {
    await axios
      .get(`${Global.URL}/brands`)
      .then((response) => {
        dispatch(setBrand(response.data));
      })
      .catch((response) => {
        console.log(response);
        Toast.fire({ icon: "error", title: response.response.data.msg });
      });
  };
};
