import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

// Función para obtener los días bloqueados del backend
const fetchBlockedDates = async () => {
  const response = await fetch("https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Ordenes/obtener-dias-bloqueados");
  const data = await response.json();
  return data.map(date => {
    const normalizedDate = new Date(date);
    normalizedDate.setMinutes(normalizedDate.getMinutes() + normalizedDate.getTimezoneOffset()); // Corrige desfases
    return normalizedDate;
  });
};

// Función para bloquear o desbloquear el día
const toggleDateStatus = async (selectedDate, action) => {
  const url = action === "block"
    ? "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Ordenes/bloquear-dia"
    : "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Ordenes/desbloquear-dia";

  // Convertimos la fecha a formato ISO (yyyy-MM-dd)
  const dia = selectedDate.toISOString().split("T")[0]; // Formato 'yyyy-MM-dd'
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Dia: dia }), // Enviamos el día en el formato requerido por el backend
  });

  const data = await response.json();
  return data;
};

const Calendar = () => {
  const [blockedDates, setBlockedDates] = useState([]); // Estado para las fechas bloqueadas
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState(""); // Mensaje para mostrar la respuesta del backend
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const [confirmAction, setConfirmAction] = useState(null); // Acción confirmada (block o unblock)

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  // Obtener las fechas bloqueadas cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      const dates = await fetchBlockedDates();
      setBlockedDates(dates);
    };
    fetchData();
  }, []);

  // Normalizar la fecha seleccionada
  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    // Aseguramos que la fecha esté normalizada en UTC para evitar desfases por zona horaria
    normalizedDate.setHours(0, 0, 0, 0); // Ajusta la fecha a medianoche
    return normalizedDate;
  };

  const handleBlockDate = async () => {
    if (selectedDate) {
      const normalizedSelectedDate = normalizeDate(selectedDate);
      const result = await toggleDateStatus(normalizedSelectedDate, "block");
      setMessage(result.mensaje); // Mostrar el mensaje de respuesta
      setBlockedDates([...blockedDates, normalizedSelectedDate]); // Actualiza las fechas bloqueadas
      setSelectedDate(null);
      handleCloseModal();
    }
  };

  const handleUnblockDate = async () => {
    if (selectedDate) {
      const normalizedSelectedDate = normalizeDate(selectedDate);
      const result = await toggleDateStatus(normalizedSelectedDate, "unblock");
      setMessage(result.mensaje); // Mostrar el mensaje de respuesta

      // Eliminar el día desbloqueado de la lista de fechas bloqueadas
      setBlockedDates(blockedDates.filter(
        (blockedDate) => blockedDate.toDateString() !== normalizedSelectedDate.toDateString()
      ));

      setSelectedDate(null);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmAction(null);
  };

  const handleShowModal = (action) => {
    setConfirmAction(action);
    setShowModal(true);
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
          filterDate={() => true}
          inline
        />
        <div className="button-container">
          {selectedDate &&
            !blockedDates.some(
              (blockedDate) =>
                blockedDate.toDateString() === normalizeDate(selectedDate).toDateString()
            ) && (
              <Button
                variant="danger"
                onClick={() => handleShowModal("block")}
                className="mt-3"
              >
                Bloquear Día
              </Button>
            )}
          {selectedDate &&
            blockedDates.some(
              (blockedDate) =>
                blockedDate.toDateString() === normalizeDate(selectedDate).toDateString()
            ) && (
              <Button
                variant="success"
                onClick={() => handleShowModal("unblock")}
                className="mt-3"
              >
                Desbloquear Día
              </Button>
            )}
        </div>
        {message && <p>{message}</p>} {/* Mostrar mensaje de la respuesta */}
      </div>

      <div className="calendar-right">
        {selectedDate &&
          blockedDates.some(
            (blockedDate) =>
              blockedDate.toDateString() === normalizeDate(selectedDate).toDateString()
          ) && <p>El día está bloqueado.</p>}
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction === "block" ? (
            <>
              <p>
                Sí hay citas agendadas estas se cancelan. ¿Desea cancelar todas las citas y bloquear
                el día?
              </p>
              <Button variant="danger" onClick={handleBlockDate}>
                Sí, bloquear el día
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                No, regresar
              </Button>
            </>
          ) : confirmAction === "unblock" ? (
            <>
              <p>
                El día ha sido desbloqueado exitosamente.
              </p>
              <Button variant="success" onClick={handleUnblockDate}>
                Sí, desbloquear el día
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                No, regresar
              </Button>
            </>
          ) : (
            <p>Operación no válida.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;

