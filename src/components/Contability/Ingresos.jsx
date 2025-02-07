import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import "./IngresosPage.css";

const API_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Ingreso";

const IngresosPage = () => {
  const navigate = useNavigate();
  const [ingresos, setIngresos] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedIngreso, setSelectedIngreso] = useState(null);

  useEffect(() => {
    fetchIngresos();
  }, []);

  const fetchIngresos = async () => {
    try {
      const response = await axios.get(`${API_URL}/Listar`);
      setIngresos(response.data);
    } catch (error) {
      console.error("Error al obtener los ingresos", error);
    }
  };

  const handleAgregarClick = () => {
    navigate("/agregar-ingreso");
  };

  const handleEditClick = (id) => {
    navigate(`/editar-ingreso/${id}`);
  };

  const handleDeleteClick = (ingreso) => {
    setSelectedIngreso(ingreso);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/Eliminar/${selectedIngreso.id}`);
      setIngresos(ingresos.filter(i => i.id !== selectedIngreso.id));
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error al eliminar el ingreso", error);
    }
  };

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe de Ingresos</Text>
          {ingresos.map((ingreso) => (
            <View key={ingreso.id} style={styles.item}>
              <Text>Fecha: {ingreso.fecha}</Text>
              <Text>Descripción: {ingreso.descripcion}</Text>
              <Text>Monto: {ingreso.monto.toFixed(2)}</Text>
              <Text>Método de Pago: {ingreso.metodoPago}</Text>
              <Text>Número de Factura/Recibo: {ingreso.numeroFactura}</Text>
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
        <button className="add-button" onClick={handleAgregarClick}>Agregar</button>
        <div className="generate-buttons">
          <PDFDownloadLink document={generatePDF()} fileName="reporte-ingresos.pdf" className="pdf-button">
            {({ loading }) => loading ? "Cargando documento..." : (<><FaFilePdf /> Generar Informe PDF</>)}
          </PDFDownloadLink>
          <button className="excel-button" onClick={handleExcelExport}>
            <FaFileExcel /> Generar Informe Excel
          </button>
        </div>
      </div>
      <table className="ingresos-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Número de Factura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td>{new Date(ingreso.fecha).toISOString().split("T")[0]}</td>
              <td>{ingreso.descripcion}</td>
              <td>{ingreso.monto.toFixed(2)}</td>
              <td>{ingreso.metodoPago}</td>
              <td>{ingreso.numeroFactura}</td>
              <td className="icon-group">
                <FaEdit className="edit-icon" onClick={() => handleEditClick(ingreso.id)} />
                <FaTrashAlt className="delete-icon" onClick={() => handleDeleteClick(ingreso)} />
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
              <button onClick={() => setShowDeletePopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 20 },
  title: { fontSize: 20, marginBottom: 10, textAlign: "center" },
  item: { marginBottom: 10 },
  separator: { height: 1, backgroundColor: "#000", marginVertical: 10 },
});

export default IngresosPage;
