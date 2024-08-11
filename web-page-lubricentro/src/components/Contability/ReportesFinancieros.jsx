import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { CSVLink } from "react-csv";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './ReportesFinancieros.css';

const ReportesFinancieros = ({ ingresos, egresos }) => {
  const [reporte, setReporte] = useState({
    ingresosTotal: 980000,
    egresosTotal: 350000,
    balance: 630000,
    fechaInicio: new Date(),
    fechaFin: new Date(),
  });

  const calcularReporte = useCallback(() => {
    const { fechaInicio, fechaFin } = reporte;
    const ingresosFiltrados = ingresos.filter(ingreso => new Date(ingreso.fecha) >= fechaInicio && new Date(ingreso.fecha) <= fechaFin);
    const egresosFiltrados = egresos.filter(egreso => new Date(egreso.fecha) >= fechaInicio && new Date(egreso.fecha) <= fechaFin);

    const ingresosTotal = ingresosFiltrados.reduce((acc, ingreso) => acc + ingreso.total, 0);
    const egresosTotal = egresosFiltrados.reduce((acc, egreso) => acc + egreso.monto, 0);
    const balance = ingresosTotal - egresosTotal;

    setReporte({
      ...reporte,
      ingresosTotal,
      egresosTotal,
      balance
    });
  }, [ingresos, egresos, reporte]);

  useEffect(() => {
    calcularReporte();
  }, [calcularReporte]);

  const handleFechaInicioChange = (e) => {
    setReporte(prevReporte => ({
      ...prevReporte,
      fechaInicio: new Date(e.target.value)
    }));
  };

  const handleFechaFinChange = (e) => {
    setReporte(prevReporte => ({
      ...prevReporte,
      fechaFin: new Date(e.target.value)
    }));
  };

  const ReportePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Reporte Financiero Consolidado</Text>
          <Text>Fecha de Inicio: {format(reporte.fechaInicio, 'yyyy-MM-dd')}</Text>
          <Text>Fecha de Fin: {format(reporte.fechaFin, 'yyyy-MM-dd')}</Text>
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
          value={format(reporte.fechaInicio, 'yyyy-MM-dd')}
          onChange={handleFechaInicioChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Fecha de Fin</label>
        <input
          type="date"
          value={format(reporte.fechaFin, 'yyyy-MM-dd')}
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
            ["Fecha de Inicio", format(reporte.fechaInicio, 'yyyy-MM-dd')],
            ["Fecha de Fin", format(reporte.fechaFin, 'yyyy-MM-dd')],
            ["Total Ingresos", reporte.ingresosTotal.toFixed(2)],
            ["Total Egresos", reporte.egresosTotal.toFixed(2)],
            ["Balance", reporte.balance.toFixed(2)],
          ]}
          filename={"reporte-financiero.csv"}
          className="export-button"
        >
          Exportar como CSV
        </CSVLink>
        <PDFDownloadLink document={<ReportePDF />} filename="reporte-financiero.pdf" className="export-button">
          Exportar como PDF
        </PDFDownloadLink>
      </div>
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
});

export default ReportesFinancieros;

