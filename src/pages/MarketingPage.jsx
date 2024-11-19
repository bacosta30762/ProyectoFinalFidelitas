// src/MarketingPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewsletters,
  deleteNewsletter,
  updateNewsletter,
} from "../redux/actions/newsletterActions";

const initialNewsletters = [
  { id: 1, tipo: "Informativo", titulo: "Horarios y Feriados" },
  { id: 2, tipo: "Promocional", titulo: "Promociones de Agosto" },
];

const MarketingPage = () => {
  const dispatch = useDispatch();
  const newsletters = useSelector((state) => state.newsletters.newsletters);

  const [showInformativeExample, setShowInformativeExample] = useState(false);
  const [showPromotionalExample, setShowPromotionalExample] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    dispatch(setNewsletters(initialNewsletters));
  }, [dispatch]);

  const toggleInformativeExample = () => {
    setShowInformativeExample(!showInformativeExample);
  };

  const togglePromotionalExample = () => {
    setShowPromotionalExample(!showPromotionalExample);
  };

  const startEditing = (newsletter) => {
    setEditingNewsletter(newsletter.id);
    setNewTitle(newsletter.titulo);
  };

  const saveNewsletter = (id) => {
    dispatch(updateNewsletter(id, newTitle));
    setEditingNewsletter(null);
    setNewTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Módulo de Marketing</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={toggleInformativeExample}>
          Ver Ejemplo de Boletín Informativo
        </button>
        <button
          onClick={togglePromotionalExample}
          style={{ marginLeft: "10px" }}
        >
          Ver Ejemplo de Boletín Promocional
        </button>
      </div>

      {showInformativeExample && (
        <div
          style={{
            margin: "20px auto",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
          }}
        >
          <h3>Ejemplo de Boletín Informativo</h3>
          <p>
            <strong>Horarios:</strong> Lunes a Viernes de 8:00 AM a 5:00 PM
          </p>
          <p>
            <strong>Feriados:</strong> 25 de Diciembre, 1 de Enero
          </p>
        </div>
      )}

      {showPromotionalExample && (
        <div
          style={{
            margin: "20px auto",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
          }}
        >
          <h3>Ejemplo de Boletín Promocional</h3>
          <p>
            <strong>Promoción:</strong> 20% de descuento en cambio de aceite
            durante Agosto
          </p>
        </div>
      )}

      <h2 style={{ textAlign: "center" }}>Boletines Creados</h2>
      {newsletters.length > 0 ? (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 3fr 2fr",
            gap: "10px",
          }}
        >
          {newsletters.map((newsletter) => (
            <React.Fragment key={newsletter.id}>
              <div>{newsletter.tipo}</div>
              <div>
                {editingNewsletter === newsletter.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  newsletter.titulo
                )}
              </div>
              <div>
                {editingNewsletter === newsletter.id ? (
                  <button onClick={() => saveNewsletter(newsletter.id)}>
                    Guardar
                  </button>
                ) : (
                  <button onClick={() => startEditing(newsletter)}>
                    Modificar
                  </button>
                )}
                <button
                  onClick={() => dispatch(deleteNewsletter(newsletter.id))}
                  style={{ marginLeft: "10px" }}
                >
                  Eliminar
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>No hay boletines creados.</div>
      )}
    </div>
  );
};

export default MarketingPage;
