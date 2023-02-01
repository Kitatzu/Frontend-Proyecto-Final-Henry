import axios from 'axios';
import { addReview } from '../Slices/Reviews';
import Global from "../../Global";

export const saveReview = (productId, review, rating) => async dispatch => {
  try {
    const response = await axios.post(`${Global.URL}/products/${productId}/reviews`, {
      review,
      rating
    });
     console.log(response.data)
    dispatch(addReview(response.data));
  } catch (error) {
    console.error(error);
  }
};
