import React, { useEffect, useState } from "react";
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
import axios from "axios";
import "./ReportesFinancieros.css";

const API_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/ReporteFinanciero";

const ReportesFinancieros = () => {
  const [reporte, setReporte] = useState({
    fechaInicio: new Date(),
    fechaFin: new Date(),
    ingresosTotal: 0,
    egresosTotal: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  // Obtener el reporte del backend
  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const fechaInicioFormateada = format(reporte.fechaInicio, "yyyy-MM-dd");
        const fechaFinFormateada = format(reporte.fechaFin, "yyyy-MM-dd");

        // Verifica si las fechas son válidas antes de hacer la llamada a la API
        if (isNaN(new Date(fechaInicioFormateada).getTime()) || isNaN(new Date(fechaFinFormateada).getTime())) {
          console.error("Las fechas no son válidas");
          return;
        }

        const response = await axios.get(API_URL, {
          params: {
            fechaInicio: fechaInicioFormateada,
            fechaFin: fechaFinFormateada,
          },
        });
        setReporte(response.data);
      } catch (error) {
        console.error("Error al obtener el reporte financiero", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, [reporte.fechaInicio, reporte.fechaFin]);

  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = new Date(e.target.value);
    // Verifica si la fecha es válida
    if (!isNaN(nuevaFechaInicio.getTime())) {
      setReporte((prevState) => ({
        ...prevState,
        fechaInicio: nuevaFechaInicio,
      }));
    } else {
      console.error("Fecha de inicio inválida");
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = new Date(e.target.value);
    // Verifica si la fecha es válida
    if (!isNaN(nuevaFechaFin.getTime())) {
      setReporte((prevState) => ({
        ...prevState,
        fechaFin: nuevaFechaFin,
      }));
    } else {
      console.error("Fecha de fin inválida");
    }
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

  if (loading) return <p>Cargando...</p>;

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
