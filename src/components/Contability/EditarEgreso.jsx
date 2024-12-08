import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEgreso } from "../../redux/actions/egresosActions";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AgregarEgreso.css";

const EditarEgreso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const egreso = useSelector((state) =>
    state.egresos.egresos.find((e) => e.id === parseInt(id))
  );

  const [fecha, setFecha] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
    if (egreso) {
      setFecha(new Date(egreso.fecha));
      setDescripcion(egreso.descripcion);
      setCategoria(egreso.categoria);
      setMonto(egreso.monto);
      setMetodoPago(egreso.metodoPago);
      setProveedor(egreso.proveedor);
      setNumeroFactura(egreso.numeroFactura);
      setComentarios(egreso.comentarios);
    }
  }, [egreso]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const egresoActualizado = {
      id: parseInt(id),
      fecha: fecha.toISOString().split("T")[0],
      descripcion,
      categoria,
      monto: parseFloat(monto),
      metodoPago,
      proveedor,
      numeroFactura,
      comentarios,
    };
    dispatch(updateEgreso(egresoActualizado));
    navigate("/egresos");
  };

  return (
    <div className="agregar-egreso-container">
      <h2>Editar Egreso</h2>
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
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="form-control"
          >
            <option value="">Seleccione una categoría</option>
            <option value="Compra de materiales">Compra de materiales</option>
            <option value="Salarios">Salarios</option>
            <option value="Mantenimiento y reparaciones">
              Mantenimiento y reparaciones
            </option>
            <option value="Gastos Operativos">Gastos Operativos</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Actualizar Egreso
        </button>
      </form>
    </div>
  );
};

export default EditarEgreso;
