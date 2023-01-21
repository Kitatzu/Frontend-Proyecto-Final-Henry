import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: null,
  isLoading: false,
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setLoadingBrand: (state, action) => {
      state.isLoading = action.payload;
    },
    setBrand: (state, action) => {
      state.brands = action.payload;
    },
  },
});
export const { setLoadingBrand, setBrand } = brandSlice.actions;
