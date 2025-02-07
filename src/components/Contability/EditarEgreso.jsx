import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEgreso } from "../../redux/actions/egresosActions";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./AgregarEgreso.css";

const API_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Egreso";

const EditarEgreso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Intentamos obtener el egreso desde Redux
  const egresoRedux = useSelector((state) =>
    state.egresos.egresos.find((e) => e.id === parseInt(id))
  );

  // Estados locales
  const [egreso, setEgreso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (egresoRedux) {
      setEgreso(egresoRedux);
      setLoading(false);
    } else {
      fetchEgreso();
    }
  }, [id, egresoRedux]);

  // Obtener el egreso desde la API
  const fetchEgreso = async () => {
    try {
      const response = await axios.get(`${API_URL}/Obtener/${id}`);
      setEgreso(response.data);
    } catch (error) {
      console.error("Error al obtener el egreso", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const egresoActualizado = {
      id: parseInt(id),
      fecha: egreso.fecha,
      descripcion: egreso.descripcion,
      monto: parseFloat(egreso.monto),
      metodoPago: egreso.metodoPago,
      numeroFactura: egreso.numeroFactura,
    };

    try {
      await axios.put(`${API_URL}/Actualizar/${id}`, egresoActualizado);
      dispatch(updateEgreso(egresoActualizado));
      navigate("/egresos");
    } catch (error) {
      console.error("Error al actualizar el egreso", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="agregar-egreso-container">
      <h2>Editar Egreso</h2>
      <form onSubmit={handleSubmit} className="agregar-egreso-form">
        <div className="form-group">
          <label>Fecha</label>
          <DatePicker
            selected={new Date(egreso.fecha)}
            onChange={(date) =>
              setEgreso({ ...egreso, fecha: date.toISOString().split("T")[0] })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            value={egreso.descripcion}
            onChange={(e) =>
              setEgreso({ ...egreso, descripcion: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Monto</label>
          <input
            type="number"
            value={egreso.monto}
            onChange={(e) =>
              setEgreso({ ...egreso, monto: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Método de Pago</label>
          <select
            value={egreso.metodoPago}
            onChange={(e) =>
              setEgreso({ ...egreso, metodoPago: e.target.value })
            }
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
            value={egreso.numeroFactura}
            onChange={(e) =>
              setEgreso({ ...egreso, numeroFactura: e.target.value })
            }
            className="form-control"
          />
        </div>

        <button type="submit" className="submit-button">
          Actualizar Egreso
        </button>
      </form>
    </div>
  );
};

export default EditarEgreso;
