// src/IngresosPage.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { eliminarIngreso } from "../../redux/actions/ingresosActions";
import "./IngresosPage.css";

const IngresosPage = () => {
  const dispatch = useDispatch();
  const ingresos = useSelector((state) => state.ingresos.ingresos);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    dispatch(eliminarIngreso(id));
  };

  return (
    <div className="ingresos-container">
      <h1>Ingresos</h1>
      <button onClick={() => navigate("/agregar-ingreso")}>
        Agregar Ingreso
      </button>
      <table className="ingresos-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td>{ingreso.fecha}</td>
              <td>{ingreso.descripcion}</td>
              <td>{ingreso.total.toFixed(2)}</td>
              <td>
                <FaEdit
                  onClick={() => navigate(`/editar-ingreso/${ingreso.id}`)}
                />
                <FaTrashAlt onClick={() => handleDeleteClick(ingreso.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngresosPage;
