// src/ReporteOrdenesPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReports, filterReports } from "../redux/actions/reportActions";

const initialReports = [
  {
    id: 1,
    numeroOrden: "001",
    placaVehiculo: "WTH459",
    servicio: "Cambio de aceite",
    cliente: "Juan Pérez",
    mecanico: "Luis Martínez",
    estado: "Asignado",
  },
  {
    id: 2,
    numeroOrden: "002",
    placaVehiculo: "HHT848",
    servicio: "Revisión de frenos",
    cliente: "María López",
    mecanico: "Carlos Ruiz",
    estado: "En Progreso",
  },
  {
    id: 3,
    numeroOrden: "003",
    placaVehiculo: "KYT972",
    servicio: "Alineación y balanceo",
    cliente: "Carlos Gómez",
    mecanico: "Fernando Torres",
    estado: "Terminado",
  },
  {
    id: 4,
    numeroOrden: "004",
    placaVehiculo: "KHV875",
    servicio: "Cambio de batería",
    cliente: "Ana Fernández",
    mecanico: "Miguel Hernández",
    estado: "Terminado",
  },
];

const ReporteOrdenesPage = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.filteredReports);
  const searchTerm = useSelector((state) => state.reports.searchTerm);
  const [showMenu, setShowMenu] = useState(false);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  useEffect(() => {
    dispatch(setReports(initialReports));
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(filterReports(e.target.value));
  };

  const handleExportPDF = () => {
    alert(`Exportar en PDF desde ${fechaDesde} hasta ${fechaHasta}`);
  };

  const handleExportCSV = () => {
    alert(`Exportar en CSV desde ${fechaDesde} hasta ${fechaHasta}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Módulo de Reportes de Órdenes
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Crear Reporte
        </button>
        <input
          type="text"
          placeholder="Buscar reportes..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {showMenu && (
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h3>Crear Reporte</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label>Desde:</label>
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                max={today}
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Hasta:</label>
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                max={today}
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleExportPDF}
              style={{
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Exportar PDF
            </button>
            <button
              onClick={handleExportCSV}
              style={{
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#17a2b8",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Exportar CSV
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <strong>Número de Orden</strong>
        </div>
        <div>
          <strong>Placa del Vehículo</strong>
        </div>
        <div>
          <strong>Servicio</strong>
        </div>
        <div>
          <strong>Cliente</strong>
        </div>
        <div>
          <strong>Mecánico</strong>
        </div>
        <div>
          <strong>Estado</strong>
        </div>
        <div>
          <strong>Acciones</strong>
        </div>

        {reports.length > 0 ? (
          reports.map((report) => (
            <React.Fragment key={report.id}>
              <div>{report.numeroOrden}</div>
              <div>{report.placaVehiculo}</div>
              <div>{report.servicio}</div>
              <div>{report.cliente}</div>
              <div>{report.mecanico}</div>
              <div>{report.estado}</div>
              <div>
                <button
                  onClick={() =>
                    alert(`Detalles del reporte ${report.numeroOrden}`)
                  }
                  style={{
                    padding: "5px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#17a2b8",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Ver Detalles
                </button>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ gridColumn: "span 7", textAlign: "center" }}>
            No se encontraron reportes.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReporteOrdenesPage;
