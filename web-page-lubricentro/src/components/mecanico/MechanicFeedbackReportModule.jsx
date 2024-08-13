import React, { useState } from "react";

const MechanicFeedbackReportModule = () => {
  // Estado para manejar las valoraciones generadas
  const [feedbackList, setFeedbackList] = useState([]);

  // Función para generar una lista fake de valoraciones
  const generateFeedbackReport = () => {
    const fakeFeedback = [
      {
        id: 1,
        cliente: "Juan Pérez",
        valoracion: 5,
        comentario: "Excelente servicio, muy profesional.",
      },
      {
        id: 2,
        cliente: "María López",
        valoracion: 4,
        comentario: "Buen trabajo, pero la entrega fue un poco tardía.",
      },
      {
        id: 3,
        cliente: "Carlos Gómez",
        valoracion: 3,
        comentario: "Servicio aceptable, pero esperaba más detalles.",
      },
      {
        id: 4,
        cliente: "Ana Fernández",
        valoracion: 5,
        comentario: "Trabajo impecable, volveré sin dudarlo.",
      },
      {
        id: 5,
        cliente: "Miguel Hernández",
        valoracion: 2,
        comentario: "El trabajo fue realizado, pero con algunos problemas.",
      },
    ];

    setFeedbackList(fakeFeedback);
  };

  // Función para renderizar estrellas según la valoración
  const renderStars = (valoracion) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= valoracion ? "gold" : "lightgray" }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h1>Reporte de Retroalimentación de Clientes</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateFeedbackReport}>
          Generar Reporte de Retroalimentación
        </button>
      </div>
      {feedbackList.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          <div>
            <strong>ID</strong>
          </div>
          <div>
            <strong>Cliente</strong>
          </div>
          <div>
            <strong>Valoración</strong>
          </div>
          <div>
            <strong>Comentario</strong>
          </div>

          {feedbackList.map((feedback) => (
            <React.Fragment key={feedback.id}>
              <div>{feedback.id}</div>
              <div>{feedback.cliente}</div>
              <div>{renderStars(feedback.valoracion)}</div>
              <div>{feedback.comentario}</div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          No se ha generado ningún reporte.
        </div>
      )}
    </div>
  );
};

export default MechanicFeedbackReportModule;
