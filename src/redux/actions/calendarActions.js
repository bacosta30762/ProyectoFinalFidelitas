export const TOGGLE_APPOINTMENT = "TOGGLE_APPOINTMENT";
export const BLOCK_DATE = "BLOCK_DATE";
export const UNBLOCK_DATE = "UNBLOCK_DATE";
export const CANCEL_APPOINTMENTS = "CANCEL_APPOINTMENTS";

export const toggleAppointment = (key) => ({
  type: TOGGLE_APPOINTMENT,
  payload: key,
});

export const blockDate = (date) => ({
  type: BLOCK_DATE,
  payload: date.toISOString(), // Convierte Date a string ISO
});

export const unblockDate = (date) => ({
  type: UNBLOCK_DATE,
  payload: date.toISOString(), // Convierte Date a string ISO
});

export const cancelAppointments = (date) => ({
  type: CANCEL_APPOINTMENTS,
  payload: date.toISOString(), // Convierte Date a string ISO
});
