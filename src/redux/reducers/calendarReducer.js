// src/redux/reducers/calendarReducer.js

import {
  TOGGLE_APPOINTMENT,
  BLOCK_DATE,
  UNBLOCK_DATE,
  CANCEL_APPOINTMENTS,
} from "../actions/calendarActions";

const initialState = {
  appointments: {},
  blockedDates: new Set(),
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_APPOINTMENT: {
      const { payload: key } = action;
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [key]: !state.appointments[key],
        },
      };
    }
    case BLOCK_DATE: {
      const newBlockedDates = new Set(state.blockedDates);
      newBlockedDates.add(action.payload);
      return { ...state, blockedDates: newBlockedDates };
    }
    case UNBLOCK_DATE: {
      const newBlockedDates = new Set(state.blockedDates);
      newBlockedDates.delete(action.payload);
      return { ...state, blockedDates: newBlockedDates };
    }
    case CANCEL_APPOINTMENTS: {
      const newAppointments = { ...state.appointments };
      Object.keys(newAppointments).forEach((key) => {
        if (key.startsWith(action.payload)) {
          delete newAppointments[key];
        }
      });
      return { ...state, appointments: newAppointments };
    }
    default:
      return state;
  }
};

export default calendarReducer;
