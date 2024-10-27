// src/MechanicOrdenListPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, filterOrders } from "../redux/actions/reportOrderActions";

const MechanicOrdenListPage = () => {
  const dispatch = useDispatch();
  const filteredOrders = useSelector((state) => state.orders.filteredOrders);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  const mecanicoNombre = "Luis Martínez"; // Nombre del mecánico

  // Datos iniciales de las órdenes
  const initialOrders = [
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

  useEffect(() => {
    dispatch(setOrders(initialOrders));
    dispatch(filterOrders(mecanicoNombre, ""));
  }, [dispatch, mecanicoNombre]);

  const handleSearchChange = (e) => {
    dispatch(filterOrders(mecanicoNombre, e.target.value));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Mecánico: {mecanicoNombre}
      </h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Mis Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar órdenes..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
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

        {filteredOrders.length > 0 ? (
          filteredOrders.map((orden) => (
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

export default MechanicOrdenListPage;
