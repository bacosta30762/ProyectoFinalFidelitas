// src/redux/actions/recoverPasswordActions.js

export const RECOVER_PASSWORD_REQUEST = "RECOVER_PASSWORD_REQUEST";
export const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS";
export const RECOVER_PASSWORD_FAILURE = "RECOVER_PASSWORD_FAILURE";

export const recoverPasswordRequest = (email) => ({
  type: RECOVER_PASSWORD_REQUEST,
  payload: email,
});

export const recoverPasswordSuccess = () => ({
  type: RECOVER_PASSWORD_SUCCESS,
});

export const recoverPasswordFailure = (error) => ({
  type: RECOVER_PASSWORD_FAILURE,
  payload: error,
});
