// src/Calendar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  toggleAppointment,
  blockDate,
  unblockDate,
  cancelAppointments,
} from "../../redux/actions/calendarActions";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

const hours = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const Calendar = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.calendar.appointments);
  const blockedDates = useSelector((state) => state.calendar.blockedDates);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const handleToggleAppointment = (hour) => {
    const key = `${selectedDate?.toDateString()}-${hour}`;
    dispatch(toggleAppointment(key));
  };

  const handleBlockDate = () => {
    const key = selectedDate?.toDateString();
    const hasAppointments = Object.keys(appointments).some((appointment) =>
      appointment.startsWith(key)
    );

    if (hasAppointments) {
      setShowModal(true);
      setConfirmAction("block");
    } else {
      dispatch(blockDate(key));
      setSelectedDate(null);
    }
  };

  const handleUnblockDate = () => {
    const key = selectedDate?.toDateString();
    dispatch(unblockDate(key));
    setSelectedDate(null);
  };

  const handleCancelAppointments = () => {
    const key = selectedDate?.toDateString();
    dispatch(cancelAppointments(key));
    dispatch(blockDate(key));
    setShowModal(false);
    setSelectedDate(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmAction(null);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <h2>Seleccione un día</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={today}
          maxDate={oneMonthFromNow}
          filterDate={(date) => date.getDay() >= 1 && date.getDay() <= 5}
          inline
        />
        <div className="button-container">
          {selectedDate && !blockedDates.has(selectedDate.toDateString()) && (
            <Button variant="danger" onClick={handleBlockDate} className="mt-3">
              Bloquear Día
            </Button>
          )}
          {selectedDate && blockedDates.has(selectedDate.toDateString()) && (
            <Button
              variant="success"
              onClick={handleUnblockDate}
              className="mt-3"
            >
              Desbloquear Día
            </Button>
          )}
        </div>
      </div>

      <div className="calendar-right">
        {selectedDate && !blockedDates.has(selectedDate.toDateString()) && (
          <>
            <h3 className="mt-4">
              Disponibilidad para {selectedDate.toDateString()}
            </h3>
            <Table bordered>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => {
                  const key = `${selectedDate?.toDateString()}-${hour}`;
                  return (
                    <tr key={hour}>
                      <td>{hour}</td>
                      <td className="text-center">
                        <Button
                          variant={appointments[key] ? "danger" : "success"}
                          onClick={() => handleToggleAppointment(hour)}
                        >
                          {appointments[key] ? "Cancelar cita" : "Agendar cita"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {selectedDate && blockedDates.has(selectedDate.toDateString()) && (
          <p>El día está bloqueado y no se pueden agendar citas.</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction === "block" ? (
            <>
              <p>
                Hay citas agendadas. ¿Desea cancelar todas las citas y bloquear
                el día?
              </p>
              <Button variant="danger" onClick={handleCancelAppointments}>
                Sí, cancelar y bloquear
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                No, regresar
              </Button>
            </>
          ) : (
            <p>El día ha sido bloqueado.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;
