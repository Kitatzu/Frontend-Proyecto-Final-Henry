import { createSlice } from "@reduxjs/toolkit";
import Toast from "../../components/Toast/Toast";

const initialState = {
  notifications: [],
  isLoading: false,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLoadingnotification: (state, action) => {
      state.isLoading = action.payload;
    },
    setAllNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setOneNotification: (state, action) => {
      const { type, notification } = JSON.parse(action.payload);
      Toast.fire({ icon: type, title: notification });
      state.notifications = [...state.notifications, { type, notification }];
    },
  },
});

export const {
  setLoadingnotification,
  setAllNotifications,
  setOneNotification,
} = notificationSlice.actions;
