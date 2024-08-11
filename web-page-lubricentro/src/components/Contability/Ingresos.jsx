import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./IngresosPage.css";

const IngresosPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedIngreso, setSelectedIngreso] = useState(null);

  const handleSearch = () => {
    console.log("Buscando ingresos desde:", startDate, "hasta:", endDate);
  };

  const handleAgregarClick = () => {
    navigate("/agregar-ingreso");
  };

  const handleDeleteClick = (ingreso) => {
    setSelectedIngreso(ingreso);
    setShowDeletePopup(true);
  };

  const handleEditClick = (id) => {
    navigate(`/editar-ingreso/${id}`);
  };

  const handleConfirmDelete = () => {
    // Lógica para eliminar el ingreso seleccionado
    console.log("Ingreso eliminado:", selectedIngreso);
    setShowDeletePopup(false);
    alert("Eliminado con éxito");
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const [ingresos] = useState([
    {
      id: 1,
      fecha: "2023-08-01",
      descripcion: "Venta de lubricante",
      tipo: "Venta",
      cantidad: 10,
      precioUnitario: 15000.0,
      total: 150000.0,
      metodoPago: "Efectivo",
      cliente: "Juan Pérez",
      factura: "F12345",
      comentarios: "Ninguno",
    },
    {
      id: 2,
      fecha: "2023-08-02",
      descripcion: "Servicio de cambio de aceite",
      tipo: "Servicio",
      cantidad: 1,
      precioUnitario: 20000.0,
      total: 20000.0,
      metodoPago: "Tarjeta",
      cliente: "María López",
      factura: "F12346",
      comentarios: "Ninguno",
    },
  ]);

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe de Ingresos</Text>
          {ingresos.map(ingreso => (
            <View key={ingreso.id} style={styles.item}>
              <Text>Fecha: {ingreso.fecha}</Text>
              <Text>Descripción: {ingreso.descripcion}</Text>
              <Text>Tipo de Ingreso: {ingreso.tipo}</Text>
              <Text>Cantidad: {ingreso.cantidad}</Text>
              <Text>Precio Unitario: {ingreso.precioUnitario.toFixed(2)}</Text>
              <Text>Total: {ingreso.total.toFixed(2)}</Text>
              <Text>Método de Pago: {ingreso.metodoPago}</Text>
              <Text>Cliente: {ingreso.cliente}</Text>
              <Text>Factura/Número de Recibo: {ingreso.factura}</Text>
              <Text>Notas/Comentarios: {ingreso.comentarios}</Text>
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(ingresos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ingresos");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "reporte-ingresos.xlsx");
  };

  return (
    <div className="ingresos-container">
      <h1>Ingresos</h1>
      <div className="buttons-container">
        <button className="add-button" onClick={handleAgregarClick}>
          Agregar
        </button>
        <div className="generate-buttons">
          <PDFDownloadLink
            document={generatePDF()}
            fileName="reporte-ingresos.pdf"
            className="pdf-button"
          >
            {({ loading }) => (loading ? "Cargando documento..." : <><FaFilePdf /> Generar Informe PDF</>)}
          </PDFDownloadLink>
          <button className="excel-button" onClick={handleExcelExport}>
            <FaFileExcel /> Generar Informe Excel
          </button>
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
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
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
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEditClick(ingreso.id)}
                />
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteClick(ingreso)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>¿Está seguro que desea eliminar el ingreso?</h3>
            <div className="popup-buttons">
              <button onClick={handleConfirmDelete}>Sí</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
  },
});

export default IngresosPage;
