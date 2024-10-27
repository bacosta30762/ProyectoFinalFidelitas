// src/redux/reducers/reportOrderReducer.js

import { SET_ORDERS, FILTER_ORDERS } from "../actions/reportOrderActions";

const initialState = {
  orders: [],
  filteredOrders: [],
  searchTerm: "",
};

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
            order.placaVehiculo
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            order.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.monto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.fecha.includes(searchTerm)
        );
      return { ...state, searchTerm, filteredOrders };
    }

    default:
      return state;
  }
};

export default reportOrderReducer;
