import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./EgresosPage.css";

const EgresosPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEgreso, setSelectedEgreso] = useState(null);

  const handleSearch = () => {
    console.log("Buscando egresos desde:", startDate, "hasta:", endDate);
  };

  const handleAgregarClick = () => {
    navigate("/agregar-egreso");
  };

  const handleDeleteClick = (egreso) => {
    setSelectedEgreso(egreso);
    setShowDeletePopup(true);
  };

  const handleEditClick = (id) => {
    navigate(`/editar-egreso/${id}`);
  };

  const handleConfirmDelete = () => {
    // Lógica para eliminar el egreso seleccionado
    console.log("Egreso eliminado:", selectedEgreso);
    setShowDeletePopup(false);
    alert("Eliminado con éxito");
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const [egresos] = useState([
    {
      id: 1,
      fecha: "2023-08-01",
      categoria: "Compra de Materiales",
      descripcion: "Compra de cemento",
      monto: 1500.00,
      metodoPago: "Transferencia",
      proveedor: "Cementos XYZ",
      numeroFactura: "F12345",
      comentarios: "Ninguno",
    },
    {
      id: 2,
      fecha: "2023-08-02",
      categoria: "Salarios",
      descripcion: "Pago de salario Julio",
      monto: 2500.00,
      metodoPago: "Efectivo",
      proveedor: "Juan Pérez",
      numeroFactura: "-",
      comentarios: "Ninguno",
    },
  ]);

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe de Egresos</Text>
          {egresos.map(egreso => (
            <View key={egreso.id} style={styles.item}>
              <Text>Fecha: {egreso.fecha}</Text>
              <Text>Categoría: {egreso.categoria}</Text>
              <Text>Descripción: {egreso.descripcion}</Text>
              <Text>Monto: {egreso.monto.toFixed(2)}</Text>
              <Text>Método de Pago: {egreso.metodoPago}</Text>
              <Text>Proveedor/Empleado: {egreso.proveedor}</Text>
              <Text>Número de Factura/Recibo: {egreso.numeroFactura}</Text>
              <Text>Comentarios: {egreso.comentarios}</Text>
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(egresos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Egresos");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "reporte-egresos.xlsx");
  };

  return (
    <div className="egresos-container">
      <h1>Egresos</h1>
      <div className="buttons-container">
        <button className="add-button" onClick={handleAgregarClick}>
          Agregar
        </button>
        <div className="generate-buttons">
          <PDFDownloadLink
            document={generatePDF()}
            fileName="reporte-egresos.pdf"
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
      <table className="egresos-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Proveedor/Empleado</th>
            <th>Número de Factura/Recibo</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {egresos.map((egreso) => (
            <tr key={egreso.id}>
              <td>{egreso.fecha}</td>
              <td>{egreso.categoria}</td>
              <td>{egreso.descripcion}</td>
              <td>{egreso.monto.toFixed(2)}</td>
              <td>{egreso.metodoPago}</td>
              <td>{egreso.proveedor}</td>
              <td>{egreso.numeroFactura}</td>
              <td>{egreso.comentarios}</td>
              <td className="icon-group">
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEditClick(egreso.id)}
                />
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteClick(egreso)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>¿Está seguro que desea eliminar el egreso?</h3>
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

export default EgresosPage;
