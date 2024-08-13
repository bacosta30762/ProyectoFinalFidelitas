import React, { useState } from "react";

const MarketingPage = () => {
  const [newsletters, setNewsletters] = useState([
    { id: 1, tipo: "Informativo", titulo: "Horarios y Feriados" },
    { id: 2, tipo: "Promocional", titulo: "Promociones de Agosto" },
  ]);

  const [showInformativeExample, setShowInformativeExample] = useState(false);
  const [showPromotionalExample, setShowPromotionalExample] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const toggleInformativeExample = () => {
    setShowInformativeExample(!showInformativeExample);
  };

  const togglePromotionalExample = () => {
    setShowPromotionalExample(!showPromotionalExample);
  };

  const deleteNewsletter = (id) => {
    setNewsletters(newsletters.filter((newsletter) => newsletter.id !== id));
  };

  const startEditing = (newsletter) => {
    setEditingNewsletter(newsletter.id);
    setNewTitle(newsletter.titulo);
  };

  const saveNewsletter = (id) => {
    setNewsletters(
      newsletters.map((newsletter) =>
        newsletter.id === id ? { ...newsletter, titulo: newTitle } : newsletter
      )
    );
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
        <button
          onClick={() =>
            alert("Funcionalidad de crear boletín informativo próximamente")
          }
        >
          Crear Boletín Informativo
        </button>
        <button
          onClick={toggleInformativeExample}
          style={{ marginLeft: "10px" }}
        >
          Ver Ejemplo de Boletín Informativo
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            alert("Funcionalidad de crear boletín promocional próximamente")
          }
        >
          Crear Boletín Promocional
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
            <strong>Promoción:</strong> 20% de descuento en servicios de cambio
            de aceite durante el mes de Agosto.
          </p>
          <p>
            <strong>Promoción:</strong> 2x1 en revisiones de frenos hasta el 15
            de Septiembre.
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
            alignItems: "center",
          }}
        >
          <div>
            <strong>Tipo</strong>
          </div>
          <div>
            <strong>Título</strong>
          </div>
          <div>
            <strong>Acciones</strong>
          </div>

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
                  onClick={() => deleteNewsletter(newsletter.id)}
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
