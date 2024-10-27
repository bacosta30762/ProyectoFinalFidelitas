// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});

export default store;
