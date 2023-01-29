import axios from "axios";
import Global from "../../Global";
import Swal from "sweetalert2";
import {
  setProductsCart,
  setTotalPrice,
  startLoadingCart,
  setStatus,
} from "../Slices/Cart";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getCart = () => {
  const userId = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userId
    : null;
  console.log(userId);
  return async (dispatch) => {
    dispatch(startLoadingCart());
    return axios
      .get(Global.URL + "/cart/" + userId)
      .then((response) => {
        console.log(response);
        dispatch(
          setProductsCart({
            status: response.data.status,
            products: response.data.cart.products,
          })
        );
        dispatch(setTotalPrice(response.data.cart.totalPrice));
      })
      .catch((e) => {
        Toast.fire({
          icon: "error",
          title: "No data found!",
        });
        console.log(e);
      });
  };
};

export const setCart = (form) => {
  const userId = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userId
    : null;
  console.log(userId);
  return async (dispatch) => {
    dispatch(startLoadingCart());
    return axios
      .post(Global.URL + "/cart/" + form.productId, {
        quantity: form.quantity,
        userId,
      })
      .then((response) => {
        dispatch(
          setStatus({ status: response.data.status, error: response.data.msg })
        );
        Toast.fire({
          icon: "success",
          title: response.data.msg,
        });
      })
      .catch((e) => {
        dispatch(
          setStatus({
            status: e.response.data.status,
            error: e.response.data.msg,
          })
        );
        Toast.fire({
          icon: "error",
          title: "El producto ya existe en el carrito!",
        });
        console.log(e);
      });
  };
};
export const editCart = (productId, quantity) => {
  const userId = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userId
    : null;
  console.log(userId);
  return async (dispatch) => {
    return await axios
      .put(Global.URL + "/cart", { productId, quantity, userId })
      .then((response) => {
        console.log(response);
        dispatch(getCart());
      })
      .catch((e) => {
        console.log(e);
        Toast.fire({
          icon: "error",
          title: "Error no encontro producto con el id especifico!",
        });
      });
  };
};
export const deleteProductInCart = (productId, cartId) => {
  console.log(productId, cartId);
  return async (dispatch) => {
    return await axios
      .delete(Global.URL + `/cart/${productId}/${cartId}`, {
        productId,
        cartId,
      })
      .then((response) => {
        console.log(response);
        dispatch(getCart());
      })
      .catch((e) => {
        console.log(e);
        Toast.fire({
          icon: "error",
          title:
            "Internal error: No se encuentra producto con id especificado!",
        });
      });
  };
};
