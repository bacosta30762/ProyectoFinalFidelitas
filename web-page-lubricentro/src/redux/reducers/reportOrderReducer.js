// src/redux/reducers/reportOrderReducer.js
import { SET_ORDERS, FILTER_ORDERS } from "../actions/reportOrderActions";

const initialState = {
  orders: [],
  filteredOrders: [],
  searchTerm: "",
};

const safeToLowerCase = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

const reportOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
      };

    case FILTER_ORDERS: {
      const { mecanicoNombre, searchTerm } = action.payload;
      const filteredOrders = state.orders
        .filter((order) => order.mecanico === mecanicoNombre)
        .filter(
          (order) =>
            order.numeroOrden.includes(searchTerm) ||
            safeToLowerCase(order.placaVehiculo).includes(
              safeToLowerCase(searchTerm)
            ) ||
            safeToLowerCase(order.servicio).includes(
              safeToLowerCase(searchTerm)
            ) ||
            safeToLowerCase(order.cliente).includes(
              safeToLowerCase(searchTerm)
            ) ||
            safeToLowerCase(`${order.monto}`).includes(
              safeToLowerCase(searchTerm)
            ) ||
            order.fecha.includes(searchTerm)
        );
      return { ...state, searchTerm, filteredOrders };
    }

    default:
      return state;
  }
};

export default reportOrderReducer;
