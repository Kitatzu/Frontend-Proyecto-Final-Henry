import axios from "axios";
import {
  addReview,
  setLoadingReviews,
  setReviews,
  setYourReview,
} from "../Slices/Reviews";
import Global from "../../Global";
import Toast from "../../components/Toast/Toast";

export const saveReview = (userId, id, rating, review) => async (dispatch) => {
  try {
    dispatch(setLoadingReviews(true));
    const response = await axios({
      method: "post",
      url: `${Global.URL}/reviews`,
      headers: {},
      data: { userId, productId: id, rating, review },
    });
    console.log(response.data);
    dispatch(setLoadingReviews(false));
    dispatch(getReviews(id));
  } catch (error) {
    console.error(error);
  }
};

export const getReviews = (productId) => async (dispatch) => {
  axios
    .get(`${Global.URL}/reviews/product/${productId}`)
    .then((response) => {
      console.log(response);
      dispatch(setReviews(response.data));
    })
    .catch((e) => {
      console.log(e);
      Toast.fire({
        icon: "warning",
        title: "Alerta! este producto no tiene reseñas.",
      });
    });
};

export const validateRating = (productId, userId) => async (dispatch) => {
  axios
    .put(`${Global.URL}/reviews`, { productId, userId })
    .then((response) => {
      console.log(response);
      dispatch(setYourReview(response.data));
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};
