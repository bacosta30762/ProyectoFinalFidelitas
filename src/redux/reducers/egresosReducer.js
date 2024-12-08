// src/redux/reducers/egresosReducer.js
import {
  SET_EGRESOS,
  ADD_EGRESO,
  UPDATE_EGRESO,
  DELETE_EGRESO,
} from "../actions/egresosActions";

const initialState = {
  egresos: [],
};

const egresosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EGRESOS:
      return {
        ...state,
        egresos: action.payload,
      };
    case ADD_EGRESO:
      return {
        ...state,
        egresos: [...state.egresos, action.payload],
      };
    case UPDATE_EGRESO:
      return {
        ...state,
        egresos: state.egresos.map((egreso) =>
          egreso.id === action.payload.id ? action.payload : egreso
        ),
      };
    case DELETE_EGRESO:
      return {
        ...state,
        egresos: state.egresos.filter((egreso) => egreso.id !== action.payload),
      };
    default:
      return state;
  }
};

export default egresosReducer;
