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

export const getProductsByName = (name) =>{
  return async(dispatch)=>{
    dispatch(setLoadingProducts(true))
    await axios.get(`${Global.URL}/products?name=${name}`).
    
    then((response)=>{
      console.log(response)
      dispatch(setProducts(response.data))
      dispatch(setLoadingProducts(false))
    })
     .catch((response)=>{
       alert(response.response.data.msg);
      console.log(response)
     })
  }
}
