// src/redux/reducers/recoverPasswordReducer.js

import {
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
} from "../actions/recoverPasswordActions";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const recoverPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOVER_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true };
    case RECOVER_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recoverPasswordReducer;
