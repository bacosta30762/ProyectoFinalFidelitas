import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarIngreso } from "../../redux/actions/ingresosActions";
import { useNavigate } from "react-router-dom";
import "./AgregarIngreso.css";

const AgregarIngreso = () => {
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoIngreso = {
      id: Date.now(),
      descripcion,
      total: parseFloat(total),
    };
    dispatch(agregarIngreso(nuevoIngreso));
    navigate("/ingresos");
  };

  return (
    <div className="agregar-ingreso-container">
      <h2>Agregar Nuevo Ingreso</h2>
      <form onSubmit={handleSubmit} className="agregar-ingreso-form">
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Total</label>
          <input
            type="number"
            className="form-control"
            placeholder="Total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AgregarIngreso;
