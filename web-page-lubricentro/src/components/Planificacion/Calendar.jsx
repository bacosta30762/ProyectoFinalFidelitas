import React, { useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [blockedDates, setBlockedDates] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const handleToggleAppointment = (hour) => {
    const key = `${selectedDate?.toDateString()}-${hour}`;
    setAppointments((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBlockDate = () => {
    const key = selectedDate?.toDateString();
    const hasAppointments = Object.keys(appointments).some((appointment) => appointment.startsWith(key));

    if (hasAppointments) {
      setShowModal(true);
      setConfirmAction('block');
    } else {
      setBlockedDates((prev) => new Set(prev.add(key)));
      setSelectedDate(null);
    }
  };

  const handleUnblockDate = () => {
    const key = selectedDate?.toDateString();
    setBlockedDates((prev) => {
      const newBlockedDates = new Set(prev);
      newBlockedDates.delete(key);
      return newBlockedDates;
    });
    setSelectedDate(null);
  };

  const handleCancelAppointments = () => {
    const key = selectedDate?.toDateString();
    setAppointments((prev) => {
      const newAppointments = { ...prev };
      Object.keys(newAppointments).forEach((appointment) => {
        if (appointment.startsWith(key)) {
          delete newAppointments[appointment];
        }
      });
      return newAppointments;
    });
    setBlockedDates((prev) => new Set(prev.add(key)));
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
          filterDate={(date) => date.getDay() >= 1 && date.getDay() <= 5} // Lunes a Viernes
          inline
        />
        {selectedDate && !blockedDates.has(selectedDate.toDateString()) && (
          <Button variant="danger" onClick={handleBlockDate} className="mt-3">
            Bloquear Día
          </Button>
        )}
        {selectedDate && blockedDates.has(selectedDate.toDateString()) && (
          <Button variant="success" onClick={handleUnblockDate} className="mt-3">
            Desbloquear Día
          </Button>
        )}
      </div>

      <div className="calendar-right">
        {selectedDate && !blockedDates.has(selectedDate.toDateString()) && (
          <>
            <h3 className="mt-4">Disponibilidad para {selectedDate.toDateString()}</h3>
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
                          variant={appointments[key] ? 'danger' : 'success'}
                          onClick={() => handleToggleAppointment(hour)}
                        >
                          {appointments[key] ? 'Cancelar cita' : 'Agendar cita'}
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
        {selectedDate && (selectedDate < today || selectedDate > oneMonthFromNow) && (
          <p>Las citas solo están disponibles para hoy y hasta un mes adelante.</p>
        )}
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction === 'block' ? (
            <>
              <p>Hay citas agendadas para este día. ¿Desea cancelar todas las citas y bloquear el día?</p>
              <Button variant="danger" onClick={handleCancelAppointments}>Sí, cancelar y bloquear</Button>
              <Button variant="secondary" onClick={handleCloseModal}>No, regresar</Button>
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
