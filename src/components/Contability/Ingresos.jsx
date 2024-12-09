import React from "react";
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
      <div className="button-container">
        <button
          className="add-button"
          onClick={() => navigate("/agregar-ingreso")}
        >
          Agregar Ingreso
        </button>
      </div>
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
              <td>₡{ingreso.total.toFixed(2)}</td>
              <td className="icon-group">
                <FaEdit
                  className="edit-icon"
                  onClick={() => navigate(`/editar-ingreso/${ingreso.id}`)}
                />
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteClick(ingreso.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngresosPage;
