import axios from 'axios';
import { addReview, setLoadingReviews } from '../Slices/Reviews';
import Global from "../../Global";

export const saveReview = (userId, id, rating, review) => async dispatch => {
  try {
    dispatch(setLoadingReviews(true));
    const response = await axios({
      method: "post",
      url: `${Global.URL}/reviews`,
      headers: {},
      data: {userId, productId: id, rating, review}
    });
    console.log(response.data)
    dispatch(setLoadingReviews(false));
    dispatch(addReview(response.data));
  } catch (error) {
    console.error(error);
  }
};
