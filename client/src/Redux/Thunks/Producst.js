import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import { setLoadingProducts, setProducts } from "../Slices/products";
//closure
export const getProducts = () => {
  return async (dispatch) => {
    //setear loading a true....
    dispatch(setLoadingProducts(true));
    //TODO: PETICION A LA API COMO PROMESA
    await axios
      .get(`${Global.URL}/products`)
      .then((response) => {
        //TODO: PROMESA RESUELTA EN SUCCESS
        console.log(response.data);
        dispatch(setProducts(response.data));
        dispatch(setLoadingProducts(false));
      })
      .catch((response) => {
        //TODO: PROMESA RESUELTA EN ERROR
        console.log(response);
        alert(response.response.data.msg);
      });
  };
};
export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    axios
      .post(`${Global.URL}/products`, form)
      .then((response) => {
        console.log(response);
        dispatch(getProducts());
        dispatch(setLoadingProducts(true));
        Toast.fire({
          icon: "success",
          text: "Producto agregado correctamente",
        });
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
