import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoadingCategories: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setLoadingCategories, setCategories } = categoriesSlice.actions;
