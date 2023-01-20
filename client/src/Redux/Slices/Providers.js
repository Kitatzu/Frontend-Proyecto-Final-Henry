import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: null,
  isLoading: false,
};

export const providerSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setLoadingProvider: (state, action) => {
      state.isLoading = action.payload;
    },
    setProvider: (state, action) => {
      state.providers = action.payload;
    },
  },
});
export const { setLoadingProvider, setProvider } = providerSlice.actions;
