// src/redux/actions/userActions.js

export const SET_USERS = "SET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const updateUser = (id, userData) => ({
  type: UPDATE_USER,
  payload: { id, userData },
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

/*
// src/redux/actions/userActions.js
import { API_ROUTES } from '../../api';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

// Obtener usuarios desde el backend
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fetch(API_ROUTES.users);
    const data = await response.json();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

// Agregar un nuevo usuario
export const addUser = (user) => async (dispatch) => {
  try {
    const response = await fetch(API_ROUTES.users, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
};

// Actualizar un usuario existente
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const response = await fetch(`${API_ROUTES.users}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};

// Eliminar un usuario
export const deleteUser = (id) => async (dispatch) => {
  try {
    await fetch(`${API_ROUTES.users}/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

*/
