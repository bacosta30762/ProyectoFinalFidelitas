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
    <div className="agregar-ingreso-container">
      <h2>Editar Ingreso</h2>
      <form onSubmit={handleSubmit} className="agregar-ingreso-form">
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            className="form-control"
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
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditarIngreso;
