import {
  TOGGLE_APPOINTMENT,
  BLOCK_DATE,
  UNBLOCK_DATE,
  CANCEL_APPOINTMENTS,
} from "../actions/calendarActions";

const initialState = {
  appointments: {}, // Las claves son cadenas, los valores son booleanos
  blockedDates: [], // Almacenar fechas como cadenas en formato ISO
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_APPOINTMENT: {
      const key = action.payload; // Clave directamente como string
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [key]: !state.appointments[key],
        },
      };
    }
    case BLOCK_DATE: {
      return {
        ...state,
        blockedDates: [...state.blockedDates, action.payload], // Agregar fecha como string
      };
    }
    case UNBLOCK_DATE: {
      return {
        ...state,
        blockedDates: state.blockedDates.filter(
          (date) => date !== action.payload
        ), // Filtrar por string
      };
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
