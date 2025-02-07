import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarIngreso } from "../../redux/actions/ingresosActions";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./AgregarIngreso.css";

const API_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Ingreso"; 

const EditarIngreso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Intentamos obtener el ingreso desde Redux
  const ingresoRedux = useSelector((state) =>
    state.ingresos.ingresos.find((ing) => ing.id === parseInt(id))
  );

  // Estados locales
  const [ingreso, setIngreso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ingresoRedux) {
      setIngreso(ingresoRedux);
      setLoading(false);
    } else {
      fetchIngreso();
    }
  }, [id, ingresoRedux]);

  // Obtener el ingreso desde la API
  const fetchIngreso = async () => {
    try {
      const response = await axios.get(`${API_URL}/Obtener/${id}`);
      setIngreso(response.data);
    } catch (error) {
      console.error("Error al obtener el ingreso", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingresoActualizado = {
      id: parseInt(id),
      fecha: ingreso.fecha,
      descripcion: ingreso.descripcion,
      monto: parseFloat(ingreso.monto),
      metodoPago: ingreso.metodoPago,
      numeroFactura: ingreso.numeroFactura,
    };

    try {
      await axios.put(`${API_URL}/Actualizar/${id}`, ingresoActualizado);
      dispatch(editarIngreso(ingresoActualizado));
      navigate("/ingresos");
    } catch (error) {
      console.error("Error al actualizar el ingreso", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="agregar-ingreso-container">
      <h2>Editar Ingreso</h2>
      <form onSubmit={handleSubmit} className="agregar-ingreso-form">
        <div className="form-group">
          <label>Fecha</label>
          <DatePicker
            selected={new Date(ingreso.fecha)}
            onChange={(date) =>
              setIngreso({ ...ingreso, fecha: date.toISOString().split("T")[0] })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            value={ingreso.descripcion}
            onChange={(e) =>
              setIngreso({ ...ingreso, descripcion: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Monto</label>
          <input
            type="number"
            value={ingreso.monto}
            onChange={(e) =>
              setIngreso({ ...ingreso, monto: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Método de Pago</label>
          <select
            value={ingreso.metodoPago}
            onChange={(e) =>
              setIngreso({ ...ingreso, metodoPago: e.target.value })
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
            value={ingreso.numeroFactura}
            onChange={(e) =>
              setIngreso({ ...ingreso, numeroFactura: e.target.value })
            }
            className="form-control"
          />
        </div>

        <button type="submit" className="submit-button">
          Actualizar Ingreso
        </button>
      </form>
    </div>
  );
};

export default EditarIngreso;
