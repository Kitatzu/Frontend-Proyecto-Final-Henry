import axios from "axios";
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
