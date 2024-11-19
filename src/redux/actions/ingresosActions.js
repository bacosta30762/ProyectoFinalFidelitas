// src/redux/actions/ingresosActions.js

export const AGREGAR_INGRESO = "AGREGAR_INGRESO";
export const EDITAR_INGRESO = "EDITAR_INGRESO";
export const ELIMINAR_INGRESO = "ELIMINAR_INGRESO";
export const CARGAR_INGRESOS = "CARGAR_INGRESOS";

export const agregarIngreso = (ingreso) => ({
  type: AGREGAR_INGRESO,
  payload: ingreso,
});

export const editarIngreso = (ingreso) => ({
  type: EDITAR_INGRESO,
  payload: ingreso,
});

export const eliminarIngreso = (id) => ({
  type: ELIMINAR_INGRESO,
  payload: id,
});

export const cargarIngresos = (ingresos) => ({
  type: CARGAR_INGRESOS,
  payload: ingresos,
});
