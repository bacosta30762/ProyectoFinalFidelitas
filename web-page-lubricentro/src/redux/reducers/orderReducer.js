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

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
      };
    case ASSIGN_MECHANIC:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.orderId
          ? { ...order, mecanicoAsignado: action.payload.mechanic }
          : order
      );
      return {
        ...state,
        orders: updatedOrders,
        filteredOrders: updatedOrders.filter(
          (order) =>
            order.numeroOrden.includes(state.searchTerm) ||
            order.placaVehiculo
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            order.servicio
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            order.cliente.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    case FILTER_ORDERS:
      const filteredOrders = state.orders.filter(
        (order) =>
          order.numeroOrden.includes(action.payload) ||
          order.placaVehiculo
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          order.servicio.toLowerCase().includes(action.payload.toLowerCase()) ||
          order.cliente.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, searchTerm: action.payload, filteredOrders };
    default:
      return state;
  }
};

export default orderReducer;
