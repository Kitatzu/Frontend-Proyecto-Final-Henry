// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     isLoading: false,
//     isLogged: false,
//     error: null,
//   },
//   reducers: {
//     setIsLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setIsLogged: (state, action) => {
//       state.isLogged = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setIsLoading, setIsLogged, setError } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  linkName: null,
  avatar: null,
  email: null,
  firstName: null,
  lastName: null,
  country: null,
  city: null,
  phone: null,
  isLog: false,
  isLoading: false,
  userDetail: null,
  users: false,
  pages: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (store, action) => {
      if (!action.payload) {
        store.userName = null;
      } else {
        if (
          JSON.parse(localStorage.getItem("token")) !== null &&
          JSON.parse(localStorage.getItem("token")).userName === action.payload
        ) {
          store.userName = action.payload;
          console.log(store.userName);
        } else {
          store.userName = null;
        }
      }
    },
    setIsLog: (store, action) => {
      if (
        JSON.parse(localStorage.getItem("token")) !== null &&
        JSON.parse(localStorage.getItem("token")).token === action.payload
      ) {
        store.isLog = true;
      } else {
        store.isLog = false;
      }
    },
    logout: (store) => {
      store.isLog = false;
    },
    setIsLoading: (store, action) => {
      store.isLoading = action.payload;
    },
    setData: (store, action) => {
      store.avatar = action.payload.avatar;
      store.firstName = action.payload.firstName;
      store.lastName = action.payload.lastName;
      store.email = action.payload.email;
      store.country = action.payload.country;
      store.city = action.payload.city;
      store.phone = action.payload.phone;
      //store.linkName = action.payload.userName;
    },
    setUserDetail: (store, action) => {
      store.userDetail = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setUsers: (store, action) => {
      store.users = action.payload;
    },
    setDeletedUsers: (store, action) => {
      store.users = action.payload;
    },
    setUsersDeleted: (store, action) => {
      store.users = action.payload;
    },
    setPagesUser: (state, action) => {
      state.pages = action.payload;
    },
  },
});

export const {
  setUserName,
  setIsLog,
  logout,
  setIsLoading,
  setData,
  setUsers,
  setUsersDeleted,
  setUserDetail,
  setPagesUser,
  setDeletedUser,
} = userSlice.actions;
