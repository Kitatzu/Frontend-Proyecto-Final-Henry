import Global from "../../Global";
import axios from "axios";
import Swal from "sweetalert2";

import { setFacturaDetail, setRedir } from "../Slices";
import { getCart } from "./getCart";
import { getProducts } from "./Products";
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

export const stockProucts = (products) => {
  return async (dispatch) => {
    if (products.length > 0) {
      try {
        products.map(
          async (p) =>
            await axios
              .put(Global.ApiUrl + "/products/" + p.productId, {
                stock: p.stock,
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((response) => {
                console.log(response);
                return false;
              })
        );
        dispatch(getProducts());
      } catch (e) {
        console.log(e);
      }
    } else Toast.fire({ icon: "Error!", title: "No existen productos!" });
  };
};

export const createFactura = (factura, pagoId, userId, products) => {
  return async (dispatch) => {
    if (factura && pagoId && userId) {
      return axios
        .post(Global.ApiUrl + "/factura", {
          factura,
          userId,
          pagoId,
        })
        .then((response) => {
          console.log(response.data);
          dispatch(
            setFacturaDetail({
              factura: response.data.data.factura.factura,
              pagoId: response.data.data.factura.pagoId,
              total: response.data.data.factura.total,
              products: products,
            })
          );
          dispatch(setRedir(true));
          Toast.fire({ icon: "success", title: "Pago exitoso!" });
          dispatch(getCart());
        })
        .catch((e) => {
          console.log(e);
          Toast.fire({ icon: "error", title: e.response.data.msg });
        });
    } else {
      console.log(factura, pagoId, userId);
      Toast.fire({ icon: "error", title: "No data!" });
    }
  };
};
