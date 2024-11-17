import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  assignMechanic,
  filterOrders,
} from "../redux/actions/orderActions";
import { API_ROUTES } from "../api";
import { getToken } from "../services/authService";

const mecanicos = [
  "Luis Martínez",
  "Carlos Ruiz",
  "Fernando Torres",
  "Miguel Hernández",
  "Ana Fernández",
];

const ListaOrdenesPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.filteredOrders);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();
        const response = await fetch(
          `${API_ROUTES.ordenes}/listar-todas-ordenes`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener las órdenes.");
        }
        const data = await response.json();

        console.log(data);
        // Transformación de datos si es necesario
        const formattedOrders = data.map((order) => ({
          id: order.numeroOrden,
          numeroOrden: order.numeroOrden,
          placaVehiculo: order.placaVehiculo,
          servicio: order.nombreServicio || "Sin especificar", // Ajusta según los datos reales
          cliente: order.nombreCliente || "Cliente no registrado",
          mecanicoAsignado: order.nombre || "",
        }));
        dispatch(setOrders(formattedOrders));
      } catch (error) {
        console.error(error);
      }
    };

    // fetchMecanicos();
    // fetchClientes();
    fetchOrders();
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
