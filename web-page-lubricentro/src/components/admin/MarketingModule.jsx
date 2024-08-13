import React, { useState } from "react";

const MarketingModule = () => {
  // Estados para manejar la visibilidad de los ejemplos
  const [showInformativeExample, setShowInformativeExample] = useState(false);
  const [showPromotionalExample, setShowPromotionalExample] = useState(false);

  // Función para manejar la visualización del ejemplo informativo
  const toggleInformativeExample = () => {
    setShowInformativeExample(!showInformativeExample);
  };

  // Función para manejar la visualización del ejemplo promocional
  const togglePromotionalExample = () => {
    setShowPromotionalExample(!showPromotionalExample);
  };

  return (
    <div>
      <h1>Módulo de Marketing</h1>
      <div style={{ marginBottom: "20px" }}>
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
        {showInformativeExample && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
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
      </div>
      <div style={{ marginBottom: "20px" }}>
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
        {showPromotionalExample && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>Ejemplo de Boletín Promocional</h3>
            <p>
              <strong>Promoción:</strong> 20% de descuento en servicios de
              cambio de aceite durante el mes de Agosto.
            </p>
            <p>
              <strong>Promoción:</strong> 2x1 en revisiones de frenos hasta el
              15 de Septiembre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingModule;
