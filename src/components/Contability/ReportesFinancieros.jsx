// src/ReportesFinancieros.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  setFechaInicio,
  setFechaFin,
  calcularReporte,
} from "../../redux/actions/financialReportActions";
import "./ReportesFinancieros.css";

const ReportesFinancieros = ({ ingresos, egresos }) => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.financialReport);

  useEffect(() => {
    dispatch(calcularReporte(ingresos, egresos));
  }, [dispatch, ingresos, egresos, reporte.fechaInicio, reporte.fechaFin]);

  const handleFechaInicioChange = (e) => {
    dispatch(setFechaInicio(new Date(e.target.value)));
  };

  const handleFechaFinChange = (e) => {
    dispatch(setFechaFin(new Date(e.target.value)));
  };

  const ReportePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Reporte Financiero Consolidado</Text>
          <Text>
            Fecha de Inicio: {format(reporte.fechaInicio, "yyyy-MM-dd")}
          </Text>
          <Text>Fecha de Fin: {format(reporte.fechaFin, "yyyy-MM-dd")}</Text>
          <Text>Total Ingresos: {reporte.ingresosTotal.toFixed(2)}</Text>
          <Text>Total Egresos: {reporte.egresosTotal.toFixed(2)}</Text>
          <Text>Balance: {reporte.balance.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="reportes-financieros-container">
      <h2>Reporte Financiero Consolidado</h2>
      <div className="form-group">
        <label>Fecha de Inicio</label>
        <input
          type="date"
          value={format(reporte.fechaInicio, "yyyy-MM-dd")}
          onChange={handleFechaInicioChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Fecha de Fin</label>
        <input
          type="date"
          value={format(reporte.fechaFin, "yyyy-MM-dd")}
          onChange={handleFechaFinChange}
          className="form-control"
        />
      </div>
      <div className="reporte-resultados">
        <h3>Resumen Financiero</h3>
        <p>Total Ingresos: {reporte.ingresosTotal.toFixed(2)}</p>
        <p>Total Egresos: {reporte.egresosTotal.toFixed(2)}</p>
        <p>Balance: {reporte.balance.toFixed(2)}</p>
      </div>
      <div className="reporte-exportar">
        <CSVLink
          data={[
            ["Fecha de Inicio", format(reporte.fechaInicio, "yyyy-MM-dd")],
            ["Fecha de Fin", format(reporte.fechaFin, "yyyy-MM-dd")],
            ["Total Ingresos", reporte.ingresosTotal.toFixed(2)],
            ["Total Egresos", reporte.egresosTotal.toFixed(2)],
            ["Balance", reporte.balance.toFixed(2)],
          ]}
          filename="reporte-financiero.csv"
          className="export-button"
        >
          Exportar como CSV
        </CSVLink>
        <PDFDownloadLink
          document={<ReportePDF />}
          filename="reporte-financiero.pdf"
          className="export-button"
        >
          Exportar como PDF
        </PDFDownloadLink>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ReportesFinancieros;
