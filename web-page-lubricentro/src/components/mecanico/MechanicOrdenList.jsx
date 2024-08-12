import React, { useState } from "react";

const MechanicOrdenList = () => {
  // Nombre del mecánico para el header (puedes cambiarlo dinámicamente según sea necesario)
  const mecanicoNombre = "Luis Martínez";

  // Datos fake para las órdenes
  const ordenes = [
    {
      id: 1,
      numeroOrden: "001",
      placaVehiculo: "TTG854",
      servicio: "Cambio de aceite",
      cliente: "Juan Pérez",
      monto: "₡18000",
      fecha: "2024-08-10",
      mecanico: "Luis Martínez",
    },
    {
      id: 2,
      numeroOrden: "002",
      placaVehiculo: "GHB548",
      servicio: "Revisión de frenos",
      cliente: "María López",
      monto: "₡8000",
      fecha: "2024-08-09",
      mecanico: "Carlos Ruiz",
    },
    {
      id: 3,
      numeroOrden: "003",
      placaVehiculo: "JHT358",
      servicio: "Alineación y balanceo",
      cliente: "Carlos Gómez",
      monto: "₡12000",
      fecha: "2024-08-08",
      mecanico: "Luis Martínez",
    },
    {
      id: 4,
      numeroOrden: "004",
      placaVehiculo: "GHI341",
      servicio: "Cambio de batería",
      cliente: "Ana Fernández",
      monto: "₡7000",
      fecha: "2024-08-07",
      mecanico: "Miguel Hernández",
    },
  ];

  // Filtrar las órdenes para mostrar solo las asociadas al mecánico actual
  const misOrdenes = ordenes.filter(
    (orden) => orden.mecanico === mecanicoNombre
  );

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Función para filtrar las órdenes según el término de búsqueda
  const filteredOrdenes = misOrdenes.filter(
    (orden) =>
      orden.numeroOrden.includes(searchTerm) ||
      orden.placaVehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.monto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.fecha.includes(searchTerm)
  );

  return (
    <div>
      <h1>Mecánico: {mecanicoNombre}</h1>
      <h2>Mis Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar órdenes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
        }}
      >
        <div>
          <strong>Número de Orden</strong>
        </div>
        <div>
          <strong>Placa del Vehículo</strong>
        </div>
        <div>
          <strong>Servicio Prestado</strong>
        </div>
        <div>
          <strong>Cliente</strong>
        </div>
        <div>
          <strong>Monto</strong>
        </div>
        <div>
          <strong>Fecha</strong>
        </div>

        {filteredOrdenes.length > 0 ? (
          filteredOrdenes.map((orden) => (
            <React.Fragment key={orden.id}>
              <div>{orden.numeroOrden}</div>
              <div>{orden.placaVehiculo}</div>
              <div>{orden.servicio}</div>
              <div>{orden.cliente}</div>
              <div>{orden.monto}</div>
              <div>{orden.fecha}</div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ gridColumn: "span 6", textAlign: "center" }}>
            No se encontraron órdenes.
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicOrdenList;
