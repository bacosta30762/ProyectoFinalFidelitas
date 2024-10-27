// src/AgregarIngreso.js

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
    <form onSubmit={handleSubmit} className="agregar-ingreso-form">
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default AgregarIngreso;
