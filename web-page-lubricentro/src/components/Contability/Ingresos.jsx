import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './IngresosPage.css';

const IngresosPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    //Función para búsqueda de fechas
    const handleSearch = () => {
        // Lógica de búsqueda según las fechas seleccionadas
        console.log("Buscando ingresos desde:", startDate, "hasta:", endDate);
    };

    const ingresos = [
        {
            id: 1,
            fecha: '2023-08-01',
            descripcion: 'Venta de lubricante',
            tipo: 'Venta',
            cantidad: 10,
            precioUnitario: 15.00,
            total: 150.00,
            metodoPago: 'Efectivo',
            cliente: 'Juan Pérez',
            factura: 'F12345',
            comentarios: 'Ninguno',
        },
        {
            id: 2,
            fecha: '2023-08-02',
            descripcion: 'Servicio de cambio de aceite',
            tipo: 'Servicio',
            cantidad: 1,
            precioUnitario: 50.00,
            total: 50.00,
            metodoPago: 'Tarjeta',
            cliente: 'María López',
            factura: 'F12346',
            comentarios: 'Ninguno',
        },
    ];

    return (
        <div className="ingresos-container">
            <h1>Ingresos</h1>
            <div className="buttons-container">
                <button className="add-button">Agregar</button>
                <div className="generate-buttons">
                    <button className="pdf-button"><FaFilePdf /> Generar Informe PDF</button>
                    <button className="excel-button"><FaFileExcel /> Generar Informe Excel</button>
                </div>
            </div>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Fecha de inicio"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Fecha de fin"
                />
                <button className="search-button" onClick={handleSearch}>Buscar</button>
            </div>
            <table className="ingresos-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Tipo de Ingreso</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                        <th>Cliente</th>
                        <th>Factura/Número de Recibo</th>
                        <th>Notas/Comentarios</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso) => (
                        <tr key={ingreso.id}>
                            <td>{ingreso.fecha}</td>
                            <td>{ingreso.descripcion}</td>
                            <td>{ingreso.tipo}</td>
                            <td>{ingreso.cantidad}</td>
                            <td>{ingreso.precioUnitario.toFixed(2)}</td>
                            <td>{ingreso.total.toFixed(2)}</td>
                            <td>{ingreso.metodoPago}</td>
                            <td>{ingreso.cliente}</td>
                            <td>{ingreso.factura}</td>
                            <td>{ingreso.comentarios}</td>
                            <td className="icon-group">
                                <FaEdit className="edit-icon" />
                                <FaTrashAlt className="delete-icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngresosPage;