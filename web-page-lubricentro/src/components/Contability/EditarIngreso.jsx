// src/EditarIngreso.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarIngreso } from "../../redux/actions/ingresosActions";
import { useParams, useNavigate } from "react-router-dom";
import "./AgregarIngreso.css";

const EditarIngreso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingreso = useSelector((state) =>
    state.ingresos.ingresos.find((ing) => ing.id === parseInt(id))
  );

  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (ingreso) {
      setDescripcion(ingreso.descripcion);
      setTotal(ingreso.total);
    }
  }, [ingreso]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingresoActualizado = {
      ...ingreso,
      descripcion,
      total: parseFloat(total),
    };
    dispatch(editarIngreso(ingresoActualizado));
    navigate("/ingresos");
  };

  return (
    <form onSubmit={handleSubmit} className="agregar-ingreso-form">
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        required
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default EditarIngreso;
