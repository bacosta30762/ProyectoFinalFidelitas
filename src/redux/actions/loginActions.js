// src/redux/actions/loginActions.js

import apiClient from "../../apiClient";
import { API_ROUTES } from "../../api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  payload: user,
});

export const fetchUserProfile = (cedula) => async (dispatch) => {
  try {
    const response = await apiClient.get(
      `${API_ROUTES.users}/ObtenerUsuario/${cedula}`
    );
    dispatch({ type: FETCH_USER_PROFILE, payload: response.data.valor });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: "Error al obtener perfil" });
  }
};

export const updateUserProfile = (cedula, updatedData) => async (dispatch) => {
  try {
    await apiClient.put(
      `${API_ROUTES.users}/Actualizar/${cedula}`,
      updatedData
    );
    dispatch({ type: UPDATE_USER_PROFILE, payload: updatedData });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: "Error al actualizar perfil" });
  }
};
