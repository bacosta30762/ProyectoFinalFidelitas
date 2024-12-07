import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, filterOrders } from "../redux/actions/reportOrderActions";
import { API_ROUTES } from "../api";
import { getToken } from "../services/authService";

const MechanicOrdenListPage = () => {
  const dispatch = useDispatch();
  const filteredOrders = useSelector((state) => state.orders.filteredOrders);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  const [mecanicoNombre, setMecanicoNombre] = useState(""); // Dynamically fetched mechanic name

  const fetchOrders = async () => {
    try {
      const token = getToken();
      const response = await fetch(
        `${API_ROUTES.ordenes}/listar-ordenes-usuario`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching mechanic orders.");
      }

      const data = await response.json();

      // Format orders
      const formattedOrders = data.map((order) => ({
        id: order.numeroOrden,
        numeroOrden: order.numeroOrden,
        placaVehiculo: order.placaVehiculo || "Sin placa",
        servicio: order.nombreServicio || "Sin servicio",
        cliente: order.nombreCliente || "No registrado",
        monto: "₡" + (order.monto || "0"),
        fecha: order.dia || "Sin fecha",
        mecanico: order.nombreMecanico || "No asignado",
      }));

      dispatch(setOrders(formattedOrders));

      if (formattedOrders.length > 0) {
        setMecanicoNombre(formattedOrders[0].mecanico);
      }
    } catch (error) {
      console.error("Error fetching mechanic orders:", error);
    }
  };

  const handleSearchChange = (e) => {
    dispatch(filterOrders(mecanicoNombre, e.target.value));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Mecánico: {mecanicoNombre || "Desconocido"}
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
