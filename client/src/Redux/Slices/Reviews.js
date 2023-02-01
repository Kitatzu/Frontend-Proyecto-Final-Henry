// actions/reviewActions.js
import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    addReview: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
