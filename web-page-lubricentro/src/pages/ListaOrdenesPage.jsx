// src/ListaOrdenesPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  assignMechanic,
  filterOrders,
} from "../redux/actions/orderActions";

const mecanicos = [
  "Luis Martínez",
  "Carlos Ruiz",
  "Fernando Torres",
  "Miguel Hernández",
  "Ana Fernández",
];

const initialOrders = [
  {
    id: 1,
    numeroOrden: "001",
    placaVehiculo: "HGT652",
    servicio: "Cambio de aceite",
    cliente: "Juan Pérez",
    mecanicoAsignado: "",
  },
  {
    id: 2,
    numeroOrden: "002",
    placaVehiculo: "WFT584",
    servicio: "Revisión de frenos",
    cliente: "María López",
    mecanicoAsignado: "",
  },
  {
    id: 3,
    numeroOrden: "003",
    placaVehiculo: "GTY474",
    servicio: "Alineación y balanceo",
    cliente: "Carlos Gómez",
    mecanicoAsignado: "",
  },
  {
    id: 4,
    numeroOrden: "004",
    placaVehiculo: "FTR845",
    servicio: "Cambio de batería",
    cliente: "Ana Fernández",
    mecanicoAsignado: "",
  },
];

const ListaOrdenesPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.filteredOrders);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  useEffect(() => {
    dispatch(setOrders(initialOrders));
  }, [dispatch]);

  const handleMecanicoSelect = (orderId, mecanico) => {
    dispatch(assignMechanic(orderId, mecanico));
  };

  const handleSearch = (e) => {
    dispatch(filterOrders(e.target.value));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lista de Órdenes
      </h2>
      <input
        type="text"
        placeholder="Buscar órdenes..."
        value={searchTerm}
        onChange={handleSearch}
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
          gridTemplateColumns: "repeat(6, 1fr)", // 6 columnas (sin "Acciones")
          gap: "10px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Encabezados */}
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
          <strong>Asignar Mecánico</strong>
        </div>
        <div>
          <strong>Mecánico Asignado</strong>
        </div>

        {/* Órdenes */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <React.Fragment key={order.id}>
              <div>{order.numeroOrden}</div>
              <div>{order.placaVehiculo}</div>
              <div>{order.servicio}</div>
              <div>{order.cliente}</div>
              <div>
                <select
                  value={order.mecanicoAsignado || ""}
                  onChange={(e) =>
                    handleMecanicoSelect(order.id, e.target.value)
                  }
                  style={{
                    padding: "5px",
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Seleccionar Mecánico</option>
                  {mecanicos.map((mecanico, index) => (
                    <option key={index} value={mecanico}>
                      {mecanico}
                    </option>
                  ))}
                </select>
              </div>
              <div>{order.mecanicoAsignado || "No asignado"}</div>
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

export default ListaOrdenesPage;
