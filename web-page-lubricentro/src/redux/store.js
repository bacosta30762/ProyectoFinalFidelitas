// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";
import newsletterReducer from "./reducers/newsletterReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    reports: reportReducer,
    newsletters: newsletterReducer,
  },
});

export default store;
