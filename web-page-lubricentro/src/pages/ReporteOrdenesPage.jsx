import React, { useState } from "react";

const ReporteOrdenesPage = () => {
  const reportes = [
    // Datos fake para los reportes de órdenes
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

  const [filteredReportes, setFilteredReportes] = useState(reportes);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const handleSearch = () => {
    const filtered = reportes.filter(
      (reporte) =>
        reporte.numeroOrden.includes(searchTerm) ||
        reporte.placaVehiculo
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reporte.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.mecanico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReportes(filtered);
  };

  const handleExportPDF = () => {
    alert(`Exportar en PDF desde ${fechaDesde} hasta ${fechaHasta}`);
  };

  const handleExportCSV = () => {
    alert(`Exportar en CSV desde ${fechaDesde} hasta ${fechaHasta}`);
  };

  const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

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
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
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
                max={today} // No permitir fechas a futuro
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
                max={today} // No permitir fechas a futuro
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

        {filteredReportes.length > 0 ? (
          filteredReportes.map((reporte) => (
            <React.Fragment key={reporte.id}>
              <div>{reporte.numeroOrden}</div>
              <div>{reporte.placaVehiculo}</div>
              <div>{reporte.servicio}</div>
              <div>{reporte.cliente}</div>
              <div>{reporte.mecanico}</div>
              <div>{reporte.estado}</div>
              <div>
                <button
                  onClick={() =>
                    alert(`Detalles del reporte ${reporte.numeroOrden}`)
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
