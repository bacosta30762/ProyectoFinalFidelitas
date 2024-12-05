// src/redux/reducers/orderReducer.js
import {
  SET_ORDERS,
  ASSIGN_MECHANIC,
  FILTER_ORDERS,
} from "../actions/orderActions";

const initialState = {
  orders: [],
  filteredOrders: [],
  searchTerm: "",
};

const safeToLowerCase = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
      };

    case ASSIGN_MECHANIC: {
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.orderId
          ? { ...order, nombreMecanico: action.payload.mechanic }
          : order
      );
      return {
        ...state,
        orders: updatedOrders,
        filteredOrders: updatedOrders.filter(
          (order) =>
            `${order.numeroOrden}`.includes(state.searchTerm) || // Convertir numeroOrden a string
            safeToLowerCase(order.placaVehiculo).includes(
              safeToLowerCase(state.searchTerm)
            ) ||
            safeToLowerCase(order.servicio).includes(
              safeToLowerCase(state.searchTerm)
            ) ||
            safeToLowerCase(order.cliente).includes(
              safeToLowerCase(state.searchTerm)
            )
        ),
      };
    }

    case FILTER_ORDERS: {
      const filteredOrders = state.orders.filter(
        (order) =>
          `${order.numeroOrden}`.includes(action.payload) || // Convertir numeroOrden a string
          safeToLowerCase(order.placaVehiculo).includes(
            safeToLowerCase(action.payload)
          ) ||
          safeToLowerCase(order.servicio).includes(
            safeToLowerCase(action.payload)
          ) ||
          safeToLowerCase(order.cliente).includes(
            safeToLowerCase(action.payload)
          )
      );
      return { ...state, searchTerm: action.payload, filteredOrders };
    }

    default:
      return state;
  }
};

export default orderReducer;
