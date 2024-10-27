// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";
import newsletterReducer from "./reducers/newsletterReducer";
import userReducer from "./reducers/userReducer";
import calendarReducer from "./reducers/calendarReducer";
import reportOrderReducer from "./reducers/reportOrderReducer";
import feedbackReducer from "./reducers/feedbackReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    reports: reportReducer,
    newsletters: newsletterReducer,
    users: userReducer,
    calendar: calendarReducer,
    orders: reportOrderReducer,
    feedback: feedbackReducer,
  },
});

export default store;
