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
