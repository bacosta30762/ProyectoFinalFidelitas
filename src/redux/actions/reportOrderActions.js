// src/redux/actions/reportOrderActions.js

export const SET_ORDERS = "SET_ORDERS";
export const FILTER_ORDERS = "FILTER_ORDERS";

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const filterOrders = (mecanicoNombre, searchTerm) => ({
  type: FILTER_ORDERS,
  payload: { mecanicoNombre, searchTerm },
});
