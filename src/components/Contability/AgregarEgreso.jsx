import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AgregarEgreso.css";

const AgregarEgreso = () => {
  const [fecha, setFecha] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nuevoEgreso = {
      fecha: fecha ? fecha.toISOString().split("T")[0] : null,
      descripcion,
      monto: parseFloat(monto),
      metodoPago,
      numeroFactura,
    };
    
    try {
      const response = await fetch("https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Egreso/Crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEgreso),
      });
      
      if (!response.ok) {
        throw new Error("Error al agregar el egreso");
      }
      
      navigate("/egresos");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="agregar-egreso-container">
      <h2>Agregar Egreso</h2>
      <form onSubmit={handleSubmit} className="agregar-egreso-form">
        <div className="form-group">
          <label>Fecha</label>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Monto</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Método de Pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Seleccione un método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta de crédito</option>
            <option value="Transferencia">Transferencia bancaria</option>
          </select>
        </div>
        <div className="form-group">
          <label>Número de Factura</label>
          <input
            type="text"
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">
          Agregar Egreso
        </button>
      </form>
    </div>
  );
};

export default AgregarEgreso;
