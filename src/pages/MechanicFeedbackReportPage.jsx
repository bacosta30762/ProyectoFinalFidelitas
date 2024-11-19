// src/MechanicFeedbackReportPage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateFeedbackReport } from "../redux/actions/feedbackActions";

const MechanicFeedbackReportPage = () => {
  const dispatch = useDispatch();
  const feedbackList = useSelector((state) => state.feedback.feedbackList);

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
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Reporte de Retroalimentación de Clientes
      </h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          onClick={() => dispatch(generateFeedbackReport())}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Generar Reporte de Retroalimentación
        </button>
      </div>
      {feedbackList.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr 3fr",
            gap: "10px",
            alignItems: "center",
            textAlign: "center",
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

export default MechanicFeedbackReportPage;
