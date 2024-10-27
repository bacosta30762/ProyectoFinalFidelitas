// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    reports: reportReducer,
  },
});

export default store;
