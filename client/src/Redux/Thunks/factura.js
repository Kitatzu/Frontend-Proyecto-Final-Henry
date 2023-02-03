import Global from "../../Global";
import axios from "axios";
import Swal from "sweetalert2";

import { setFacturaDetail, setRedir, startLoadingFactura } from "../Slices";
import { getCart } from "./getCart";
import { getPage } from "./Products";
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
              .put(Global.URL + "/products/" + p.productId, {
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
        dispatch(getPage(1));
      } catch (e) {
        console.log(e);
      }
    } else Toast.fire({ icon: "Error!", title: "No existen productos!" });
  };
};

export const createFactura = (factura, paymentId, userId, products) => {
  return async (dispatch) => {
    if (factura && paymentId && userId) {
      return axios
        .post(Global.URL + "/factura", {
          factura,
          userId,
          paymentId,
        })
        .then((response) => {
          console.log(response.data);
          dispatch(
            setFacturaDetail({
              id: response.data.data.factura.id,
              numberBill: response.data.data.factura.numberBill,
              paymentId: response.data.data.factura.paymentId,
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
      Toast.fire({ icon: "error", title: "No data!" });
    }
  };
};

export const getFacturaDetail = (factura) => {
  return async (dispatch) => {
    dispatch(startLoadingFactura());
    axios
      .get(Global.URL + "/factura/detail/" + factura)
      .then((response) => {
        console.log(response);
        dispatch(
          setFacturaDetail({
            id: response.data.findFacturas.id,
            numberBill: response.data.findFacturas.numberBill,
            paymentId: response.data.findFacturas.paymentId,
            total: response.data.findFacturas.total,
            products: response.data.findProducts,
          })
        );
        dispatch(setRedir(true));
      })
      .catch((response) => {
        console.log(response);
        Toast.fire({ icon: "warning", title: "La factura no existe!" });
      });
  };
};
//TODO:GETFACTURAS
//TODO: GETFACTURA DETAIL
