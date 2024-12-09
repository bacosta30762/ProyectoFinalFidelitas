// src/redux/actions/egresosActions.js
import { API_ROUTES } from "../../api";
import { getToken } from "../../services/authService";

export const SET_EGRESOS = "SET_EGRESOS";
export const ADD_EGRESO = "ADD_EGRESO";
export const UPDATE_EGRESO = "UPDATE_EGRESO";
export const DELETE_EGRESO = "DELETE_EGRESO";

// Set Egresos
export const setEgresos = (egresos) => ({
  type: SET_EGRESOS,
  payload: egresos,
});

// Add Egreso
export const addEgreso = (egreso) => ({
  type: ADD_EGRESO,
  payload: egreso,
});

// Update Egreso
export const updateEgreso = (egreso) => ({
  type: UPDATE_EGRESO,
  payload: egreso,
});

// Delete Egreso
export const deleteEgreso = (id) => ({
  type: DELETE_EGRESO,
  payload: id,
});

// Fetch Egresos
export const fetchEgresos = () => async (dispatch) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_ROUTES.egresos}/list`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Error fetching egresos.");
    }

    const data = await response.json();
    dispatch(setEgresos(data));
  } catch (error) {
    console.error("Error fetching egresos:", error);
  }
};

// Add Egreso API Call
export const createEgreso = (egreso) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_ROUTES.egresos}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(egreso),
    });

    if (!response.ok) {
      throw new Error("Error creating egreso.");
    }

    const data = await response.json();
    dispatch(addEgreso(data));
  } catch (error) {
    console.error("Error creating egreso:", error);
  }
};

// Update Egreso API Call
export const modifyEgreso = (id, egreso) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_ROUTES.egresos}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(egreso),
    });

    if (!response.ok) {
      throw new Error("Error updating egreso.");
    }

    const data = await response.json();
    dispatch(updateEgreso(data));
  } catch (error) {
    console.error("Error updating egreso:", error);
  }
};

// Delete Egreso API Call
export const removeEgreso = (id) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_ROUTES.egresos}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Error deleting egreso.");
    }

    dispatch(deleteEgreso(id));
  } catch (error) {
    console.error("Error deleting egreso:", error);
  }
};
