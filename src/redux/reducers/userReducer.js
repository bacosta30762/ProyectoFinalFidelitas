// src/redux/reducers/userReducer.js
import { SET_USERS, UPDATE_USER, DELETE_USER } from "../actions/userActions";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };

    case UPDATE_USER:
  return {
    ...state,
    users: state.users.map((user) =>
      user.id === action.payload.id
        ? { ...user, ...action.payload.userData, activo: action.payload.userData.activo ?? user.activo } // ✅ Asegura que activo se actualiza correctamente
        : user
    ),
  };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
