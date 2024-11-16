// src/redux/actions/financialReportActions.js

export const SET_FECHA_INICIO = "SET_FECHA_INICIO";
export const SET_FECHA_FIN = "SET_FECHA_FIN";
export const CALCULAR_REPORTE = "CALCULAR_REPORTE";

export const setFechaInicio = (fecha) => ({
  type: SET_FECHA_INICIO,
  payload: fecha,
});

export const setFechaFin = (fecha) => ({
  type: SET_FECHA_FIN,
  payload: fecha,
});

export const calcularReporte = (ingresos, egresos) => ({
  type: CALCULAR_REPORTE,
  payload: { ingresos, egresos },
});
