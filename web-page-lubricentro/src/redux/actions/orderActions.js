// src/redux/actions/orderActions.js

export const SET_ORDERS = "SET_ORDERS";
export const ASSIGN_MECHANIC = "ASSIGN_MECHANIC";
export const FILTER_ORDERS = "FILTER_ORDERS";

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const assignMechanic = (orderId, mechanic) => ({
  type: ASSIGN_MECHANIC,
  payload: { orderId, mechanic },
});

export const filterOrders = (searchTerm) => ({
  type: FILTER_ORDERS,
  payload: searchTerm,
});
