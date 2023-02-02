import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: null,
  isLoading: false
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoadingReviews: (state, action) => {
      state.isLoading = action.payload;
    },

    addReview: (state, action) => {
      state.reviews = action.payload;
    }
  }
});

export const { setLoadingReviews, addReview } = reviewsSlice.actions;
