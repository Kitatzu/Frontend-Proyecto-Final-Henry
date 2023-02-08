import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/Toast";
import Global from "../../Global";
import {
  setCreateProduct,
  setLoadingProducts,
  setProducts,
  setProductID,
  setSeriesProducts,
  setPages,
  setPopularProducts,
  setDeletedProducts,
} from "../Slices/Products";
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
        console.log(response);
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

export const getProductsByName = (name) => {
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    await axios
      .get(`${Global.URL}/search/${name}`)
      .then((response) => {
        console.log(response);
        dispatch(setProducts(response.data));
        dispatch(setLoadingProducts(false));
      })
      .catch((response) => {
        // alert(response.response.data.msg);
        console.log(response);
      });
  };
};

export const getProductByID = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingProducts(true));
      axios
        .get(`${Global.URL}/products/${id}`)
        .then((response) => {
          dispatch(setProductID(response.data));
          dispatch(setLoadingProducts(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(setLoadingProducts(false));
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    return await axios({
      url: `${Global.URL}/products`,
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    })
      .then((response) => {
        console.log(response);
        dispatch(getProducts());
        dispatch(setLoadingProducts(false));
        dispatch(setCreateProduct(response.data.newProduct.id));
        Toast.fire({
          icon: "success",
          text: "Producto agregado correctamente",
        });
      })
      .catch((response) => {
        console.log(response);
        dispatch(setLoadingProducts(false));
        Swal.fire({
          icon: "error",
          title: response.response.data.Message,
        });
      });
  };
};

export const addProduct = (serie, productId) => {
  console.log(productId);
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    axios
      .post(`${Global.URL}/series`, { serie, productId })
      .then((response) => {
        console.log(response);
        dispatch(setSeriesProducts(response.data.newSerie.serie));
        dispatch(getPage(1));
        dispatch(setLoadingProducts(false));
      })
      .catch((response) => {
        console.log(response);
        dispatch(setLoadingProducts(false));
        Toast.fire({ icon: "error", title: response.response.data.msg });
      });
  };
};

export const getPage = (page) => {
  if (parseInt(page) === 0) {
    return async (dispatch) => {
      await axios
        .get(`${Global.URL}/products/page/${page}`)
        .then((response) => {
          dispatch(setPages(response.data.pages));
        })
        .catch((response) => {
          Toast.fire({ icon: "error", title: response.response.data.msg });
        });
    };
  } else {
    return async (dispatch) => {
      await axios
        .get(`${Global.URL}/products/page/${page}`)
        .then((response) => {
          console.log(response.data);
          dispatch(setProducts(response.data));
        })
        .catch((response) => {
          console.log(response);
          Toast.fire({ icon: "error", title: response.response.data.msg });
        });
    };
  }
};
export const getProductsByCategories = (name) => {
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    await axios
      .get(`${Global.URL}/filter/${name}`)
      .then((response) => {
        dispatch(setProducts(response.data.filterCategories));
        dispatch(setLoadingProducts(false));
      })
      .catch((response) => {
        // alert(response.response.data.msg);
        dispatch(setLoadingProducts(false));
        console.log(response);
      });
  };
};

export const getPopularProducts = () => {
  return async (dispatch) => {
    axios
      .get(Global.URL + "/products/other/popular")
      .then((response) => {
        dispatch(setPopularProducts(response.data));
      })
      .catch((e) => {
        console.log(e);
        Toast.fire({
          icon: "warning",
          title: "Advertencia! no existen productos populares.",
        });
      });
  };
};

export const pageStatusCero = (page) => {
  if (parseInt(page) === 0) {
    return async (dispatch) => {
      await axios
        .get(`${Global.URL}/products/page0/${page}`)
        .then((response) => {
          dispatch(setPages(response.data.pages));
          console.log(response.data.pages);
        })
        .catch((response) => {
          Toast.fire({ icon: "error", title: response.response.data.msg });
        });
    };
  } else {
    return async (dispatch) => {
      await axios
        .get(`${Global.URL}/products/page0/${page}`)
        .then((response) => {
          dispatch(setDeletedProducts(response.data));
        })
        .catch((response) => {
          console.log(response);
          Toast.fire({ icon: "error", title: response.response.data.msg });
        });
    };
  }
};

export const deletedProducts = () => {
  return async (dispatch) => {
    dispatch(setLoadingProducts(true));
    await axios
      .get(`${Global.URL}/products/status`)
      .then((response) => {
        dispatch(setDeletedProducts(response.data));
        dispatch(setLoadingProducts(false));
      })
      .catch((response) => {
        dispatch(setLoadingProducts(false));
        console.log(response);
      });
  };
};
