import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SAVE_USER_DATA,
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE,
  PROFILE_ERROR,
} from "../actions/loginActions";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SAVE_USER_DATA:
      return { ...state, user: action.payload };
    case FETCH_USER_PROFILE:
      return { ...state, user: action.payload, error: null };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null,
      };
    case PROFILE_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default loginReducer;
