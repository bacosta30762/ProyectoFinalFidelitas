import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AgregarIngreso.css';

const EditarIngreso = ({ ingresos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [cliente, setCliente] = useState('');
  const [factura, setFactura] = useState('');
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    // Buscar el ingreso por ID en el array de ingresos
    const ingreso = ingresos.find((item) => item.id === parseInt(id));
    if (ingreso) {
      setFecha(new Date(ingreso.fecha));
      setDescripcion(ingreso.descripcion);
      setTipo(ingreso.tipo);
      setCantidad(ingreso.cantidad);
      setPrecioUnitario(ingreso.precioUnitario);
      setMetodoPago(ingreso.metodoPago);
      setCliente(ingreso.cliente);
      setFactura(ingreso.factura);
      setComentarios(ingreso.comentarios);
    }
  }, [id, ingresos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple de que todos los campos están llenos
    if (!fecha || !descripcion || !tipo || !cantidad || !precioUnitario || !metodoPago || !cliente || !factura) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Validación de formato de datos
    if (isNaN(cantidad) || isNaN(precioUnitario)) {
      alert('Cantidad y Precio Unitario deben ser valores numéricos.');
      return;
    }

    // Manejar el ingreso (enviar al backend, etc.)
    const ingresoActualizado = {
      id: parseInt(id),
      fecha,
      descripcion,
      tipo,
      cantidad: parseFloat(cantidad),
      precioUnitario: parseFloat(precioUnitario),
      total: parseFloat(cantidad) * parseFloat(precioUnitario),
      metodoPago,
      cliente,
      factura,
      comentarios,
    };

    console.log('Ingreso actualizado:', ingresoActualizado);
    // Redirigir después de actualizar
    navigate('/ingresos');
  };

  return (
    <div className="agregar-ingreso-container">
      <h2>Editar Ingreso</h2>
      <form onSubmit={handleSubmit} className="agregar-ingreso-form">
        <div className="form-group">
          <label>Fecha</label>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Seleccione una fecha"
            required
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
          <label>Tipo de Ingreso</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Servicio prestados">Servicio prestados</option>
            <option value="Venta de productos">Venta de productos</option>
            <option value="Otras fuentes">Otras fuentes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Precio Unitario</label>
          <input
            type="number"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Método de Pago</label>
          <input
            type="text"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Factura/Número de Recibo</label>
          <input
            type="text"
            value={factura}
            onChange={(e) => setFactura(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Notas/Comentarios</label>
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Actualizar Ingreso</button>
      </form>
    </div>
  );
};

export default EditarIngreso;