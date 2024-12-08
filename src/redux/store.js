// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";
import newsletterReducer from "./reducers/newsletterReducer";
import userReducer from "./reducers/userReducer";
import calendarReducer from "./reducers/calendarReducer";
import feedbackReducer from "./reducers/feedbackReducer";
import financialReportReducer from "./reducers/financialReportReducer";
import ingresosReducer from "./reducers/ingresosReducer";
import egresosReducer from "./reducers/egresosReducer";
import { categoriesReducer } from "./reducers/categoriesReducer";
import loginReducer from "./reducers/loginReducer";
import recoverPasswordReducer from "./reducers/recoverPasswordReducer";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    reports: reportReducer,
    newsletters: newsletterReducer,
    users: userReducer,
    calendar: calendarReducer,
    feedback: feedbackReducer,
    financialReport: financialReportReducer,
    ingresos: ingresosReducer,
    egresos: egresosReducer,
    categoriesState: categoriesReducer,
    loginState: loginReducer,
    recoverPassword: recoverPasswordReducer,
  },
});

export default store;
