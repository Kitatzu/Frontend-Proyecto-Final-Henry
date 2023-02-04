import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: null,
  yourReview: null,
  isReview: false,
  isLoading: false,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setLoadingReviews: (state, action) => {
      state.isLoading = action.payload;
      state.isReview = false;
    },

    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setYourReview: (state, action) => {
      state.yourReview = action.payload;
      state.isReview = true;
    },
  },
});

export const { setLoadingReviews, setReviews, setYourReview } =
  reviewsSlice.actions;
