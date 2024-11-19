import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  assignMechanic,
  filterOrders,
} from "../redux/actions/orderActions";
import { API_ROUTES } from "../api";
import { getToken } from "../services/authService";

const ListaOrdenesPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders?.filteredOrders || []);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  const [mecanicos, setMecanicos] = useState([]); // Estado para almacenar la lista de mecánicos

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

        // Formatear datos y serializar fechas
        const formattedOrders = data.map((order) => ({
          id: order.numeroOrden,
          numeroOrden: order.numeroOrden,
          estado: order.estado,
          placaVehiculo: order.placaVehiculo,
          nombreMecanico: order.nombreMecanico || "No asignado",
          cliente: order.nombreCliente || "Cliente no registrado",
          dia: order.dia
            ? new Date(order.dia).toISOString()
            : "Fecha no disponible", // Serializar fecha
          hora: order.hora ? `${order.hora}:00` : "Hora no disponible",
          servicio: order.nombreServicio || "Sin especificar",
        }));

        dispatch(setOrders(formattedOrders));
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    const fetchMecanicos = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${API_ROUTES.ordenes}/lista-mecanicos`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Error al obtener la lista de mecánicos.");
        }
        const data = await response.json();
        setMecanicos(data); // Almacenar la lista de mecánicos en el estado local
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchOrders(); // Llamar a la función para obtener órdenes
    fetchMecanicos(); // Llamar a la función para obtener mecánicos
  }, [dispatch]);

  const handleMecanicoSelect = async (orderId, mecanicoId) => {
    try {
      if (!orderId || !mecanicoId) {
        console.error(
          "Error: Los valores de número de orden o mecánico son inválidos."
        );
        return;
      }

      const token = getToken();

      // Crear la URL con los parámetros
      const url = `${API_ROUTES.ordenes}/asignar-mecanico?numeroOrden=${orderId}&mecanicoId=${mecanicoId}`;

      console.log("Enviando solicitud PUT a URL:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Solo se envían encabezados, sin body
        },
      });

      console.log("Respuesta del servidor:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en el servidor:", errorText);
        throw new Error("Error al asignar el mecánico.");
      }

      // Encontrar el nombre del mecánico asignado
      const selectedMecanico = mecanicos.find(
        (mecanico) => mecanico.mecanicoId === mecanicoId
      );

      // Actualizar el estado global con el mecánico asignado
      dispatch(
        assignMechanic(orderId, selectedMecanico?.nombre || "No asignado")
      );
    } catch (error) {
      console.error("Error al asignar el mecánico:", error);
    }
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
          gridTemplateColumns: "repeat(5, 1fr)",
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
                  value={
                    mecanicos.find(
                      (mecanico) => mecanico.nombre === order.nombreMecanico
                    )?.mecanicoId || ""
                  }
                  onChange={(e) =>
                    handleMecanicoSelect(order.numeroOrden, e.target.value)
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
                  {mecanicos.map((mecanico) => (
                    <option
                      key={mecanico.mecanicoId}
                      value={mecanico.mecanicoId}
                    >
                      {mecanico.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ gridColumn: "span 5", textAlign: "center" }}>
            No se encontraron órdenes.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaOrdenesPage;
