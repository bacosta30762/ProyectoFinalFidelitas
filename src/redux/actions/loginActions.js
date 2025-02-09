import apiClient from "../../apiClient";
import { API_ROUTES } from "../../api";

// Tipos de acción
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";

// ✅ Acción para iniciar el proceso de login
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

// ✅ Acción cuando el login es exitoso
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// ✅ Acción cuando el login falla
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// ✅ Acción para cerrar sesión
export const logout = () => ({
  type: LOGOUT,
});

// ✅ Acción para guardar los datos del usuario en Redux
export const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  payload: user,
});

// ✅ Acción para obtener el perfil del usuario autenticado
export const fetchUserProfile = (cedula) => async (dispatch) => {
  try {
    const response = await apiClient.get(
      `${API_ROUTES.users}/ObtenerUsuario/${cedula}`
    );

    if (response.data.fueExitoso) {
      dispatch({ type: FETCH_USER_PROFILE, payload: response.data.valor });
    } else {
      dispatch({ type: PROFILE_ERROR, payload: "Error al obtener perfil." });
    }
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    dispatch({ type: PROFILE_ERROR, payload: "Error al obtener perfil." });
  }
};

// ✅ Acción para actualizar el perfil del usuario
export const updateUserProfile = (cedula, updatedData) => async (dispatch) => {
  try {
    // 🔹 Construcción del payload asegurando que coincida con la API
    const payload = {
      cedula: cedula, // La cédula no cambia
      nombre: updatedData.nombre,
      apellidos: updatedData.apellidos,
      correo: updatedData.correo,
    };

    await apiClient.put(`${API_ROUTES.users}/Actualizar/${cedula}`, payload);

    // 🔹 Obtener nuevamente el perfil actualizado desde el backend
    dispatch(fetchUserProfile(cedula));

    // 🔹 Actualizar directamente en Redux para reflejar los cambios de inmediato
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: payload,
    });
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    dispatch({ type: PROFILE_ERROR, payload: "Error al actualizar perfil." });
  }
};
