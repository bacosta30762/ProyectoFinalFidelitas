// src/redux/reducers/financialReportReducer.js
import {
  SET_FECHA_INICIO,
  SET_FECHA_FIN,
  CALCULAR_REPORTE,
} from "../actions/financialReportActions";

const initialState = {
  ingresosTotal: 0,
  egresosTotal: 0,
  balance: 0,
  fechaInicio: new Date(),
  fechaFin: new Date(),
};

const financialReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FECHA_INICIO:
      return { ...state, fechaInicio: action.payload };

    case SET_FECHA_FIN:
      return { ...state, fechaFin: action.payload };

    case CALCULAR_REPORTE: {
      const { ingresos, egresos } = action.payload;
      const ingresosTotal = ingresos.reduce(
        (acc, ingreso) => acc + ingreso.total,
        0
      );
      const egresosTotal = egresos.reduce(
        (acc, egreso) => acc + egreso.monto,
        0
      );
      const balance = ingresosTotal - egresosTotal;
      return { ...state, ingresosTotal, egresosTotal, balance };
    }

    default:
      return state;
  }
};

export default financialReportReducer;
