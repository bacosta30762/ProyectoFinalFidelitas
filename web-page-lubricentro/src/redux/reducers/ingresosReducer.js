// src/redux/reducers/ingresosReducer.js

import {
  AGREGAR_INGRESO,
  EDITAR_INGRESO,
  ELIMINAR_INGRESO,
  CARGAR_INGRESOS,
} from "../actions/ingresosActions";

const initialState = {
  ingresos: [
    {
      id: 1,
      fecha: "2023-08-01",
      descripcion: "Venta de lubricante",
      tipo: "Venta",
      cantidad: 10,
      precioUnitario: 15000.0,
      total: 150000.0,
      metodoPago: "Efectivo",
      cliente: "Juan Pérez",
      factura: "F12345",
      comentarios: "Ninguno",
    },
    {
      id: 2,
      fecha: "2023-08-02",
      descripcion: "Servicio de cambio de aceite",
      tipo: "Servicio",
      cantidad: 1,
      precioUnitario: 20000.0,
      total: 20000.0,
      metodoPago: "Tarjeta",
      cliente: "María López",
      factura: "F12346",
      comentarios: "Ninguno",
    },
  ],
};

const ingresosReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_INGRESO:
      return {
        ...state,
        ingresos: [...state.ingresos, action.payload],
      };
    case EDITAR_INGRESO:
      return {
        ...state,
        ingresos: state.ingresos.map((ingreso) =>
          ingreso.id === action.payload.id ? action.payload : ingreso
        ),
      };
    case ELIMINAR_INGRESO:
      return {
        ...state,
        ingresos: state.ingresos.filter(
          (ingreso) => ingreso.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ingresosReducer;
