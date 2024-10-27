// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";
import newsletterReducer from "./reducers/newsletterReducer";
import userReducer from "./reducers/userReducer";
import calendarReducer from "./reducers/calendarReducer";
import reportOrderReducer from "./reducers/reportOrderReducer";
import feedbackReducer from "./reducers/feedbackReducer";
import financialReportReducer from "./reducers/financialReportReducer";
import ingresosReducer from "./reducers/ingresosReducer";
import { categoriesReducer } from "./reducers/categoriesReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    reports: reportReducer,
    newsletters: newsletterReducer,
    users: userReducer,
    calendar: calendarReducer,
    orders: reportOrderReducer,
    feedback: feedbackReducer,
    financialReport: financialReportReducer,
    ingresos: ingresosReducer,
    categoriesState: categoriesReducer,
  },
});

export default store;
