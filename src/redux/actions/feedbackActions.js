// src/redux/actions/feedbackActions.js

export const GENERATE_FEEDBACK_REPORT = "GENERATE_FEEDBACK_REPORT";

export const generateFeedbackReport = () => {
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

  return {
    type: GENERATE_FEEDBACK_REPORT,
    payload: fakeFeedback,
  };
};
