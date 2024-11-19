import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AgregarEgreso.css';

const AgregarEgreso = () => {
    const [fecha, setFecha] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [numeroFactura, setNumeroFactura] = useState('');
    const [comentarios, setComentarios] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple de que todos los campos están llenos
        if (!fecha || !descripcion || !categoria || !monto || !metodoPago || !proveedor || !numeroFactura) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Validación de formato de datos
        if (isNaN(monto)) {
            alert('Monto debe ser un valor numérico.');
            return;
        }

        // Manejar el egreso (enviar al backend, etc.)
        const nuevoEgreso = {
            fecha,
            descripcion,
            categoria,
            monto: parseFloat(monto),
            metodoPago,
            proveedor,
            numeroFactura,
            comentarios,
        };

        console.log('Egreso agregado:', nuevoEgreso);
        // Resetear los campos después de agregar el egreso
        setFecha(null);
        setDescripcion('');
        setCategoria('');
        setMonto('');
        setMetodoPago('');
        setProveedor('');
        setNumeroFactura('');
        setComentarios('');
    };

    return (
        <div className="agregar-egreso-container">
            <h2>Agregar Egreso</h2>
            <form onSubmit={handleSubmit} className="agregar-egreso-form">
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
                    <label>Categoría</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="Compra de materiales">Compra de materiales</option>
                        <option value="Salarios">Salarios</option>
                        <option value="Mantenimiento y reparaciones">Mantenimiento y reparaciones</option>
                        <option value="Gastos Operativos">Gastos Operativos</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Monto</label>
                    <input
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
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
                    <label>Proveedor/Empleado</label>
                    <input
                        type="text"
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Número de Factura/Recibo</label>
                    <input
                        type="text"
                        value={numeroFactura}
                        onChange={(e) => setNumeroFactura(e.target.value)}
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
                <button type="submit" className="submit-button">Agregar Egreso</button>
            </form>
        </div>
    );
};

export default AgregarEgreso;
