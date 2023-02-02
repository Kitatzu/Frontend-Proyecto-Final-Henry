import axios from 'axios';
import { addReview } from '../Slices/Reviews';
import Global from "../../Global";

export const saveReview = (userId, id, rating, review) => async dispatch => {
  try {
    const response = await axios.post(`${Global.URL}/reviews/`, {
      rating,
      review,
      userId,
      productId: id
    });
     console.log(response.data)
    dispatch(addReview(response.data));
  } catch (error) {
    console.error(error);
  }
};
