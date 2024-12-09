import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchEgresos, deleteEgreso } from "../../redux/actions/egresosActions";
import "./EgresosPage.css";

const EgresosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const egresos = useSelector((state) => state.egresos.egresos);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEgreso, setSelectedEgreso] = useState(null);

  useEffect(() => {
    dispatch(fetchEgresos());
  }, [dispatch]);

  const handleAgregarClick = () => {
    navigate("/agregar-egreso");
  };

  const handleEditClick = (id) => {
    navigate(`/editar-egreso/${id}`);
  };

  const handleDeleteClick = (egreso) => {
    setSelectedEgreso(egreso);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEgreso(selectedEgreso.id));
    setShowDeletePopup(false);
  };

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe de Egresos</Text>
          {egresos.map((egreso) => (
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
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "reporte-egresos.xlsx"
    );
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
            {({ loading }) =>
              loading ? (
                "Cargando documento..."
              ) : (
                <>
                  <FaFilePdf /> Generar Informe PDF
                </>
              )
            }
          </PDFDownloadLink>
          <button className="excel-button" onClick={handleExcelExport}>
            <FaFileExcel /> Generar Informe Excel
          </button>
        </div>
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

export default EgresosPage;
