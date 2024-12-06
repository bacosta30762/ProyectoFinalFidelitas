import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  assignMechanic,
  filterOrders,
} from "../redux/actions/orderActions";
import { API_ROUTES } from "../api";
import { getToken } from "../services/authService";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListaOrdenesPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders?.filteredOrders || []);
  const searchTerm = useSelector((state) => state.orders.searchTerm);

  const [mecanicos, setMecanicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;

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

        if (Array.isArray(data)) {
          const formattedOrders = data.map((order) => ({
            id: order.numeroOrden,
            numeroOrden: order.numeroOrden,
            estado: order.estado || "Sin estado",
            placaVehiculo: order.placaVehiculo || "Sin placa",
            nombreMecanico: order.nombreMecanico || "No asignado",
            cliente: order.nombreCliente || "Cliente no registrado",
            dia: order.dia
              ? new Date(order.dia).toLocaleDateString()
              : "Fecha no disponible",
            hora: order.hora ? `${order.hora}:00` : "Hora no disponible",
            servicio: order.nombreServicio || "Sin especificar",
          }));

          dispatch(setOrders(formattedOrders));
        } else {
          console.error("El formato de las órdenes no es válido.");
        }
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
        setMecanicos(data);
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchOrders();
    fetchMecanicos();
  }, [dispatch]);

  const handleMecanicoSelect = async (orderId, mecanicoId) => {
    try {
      if (!orderId || !mecanicoId) {
        console.error("Valores inválidos para el mecánico o la orden.");
        return;
      }

      const token = getToken();
      const url = `${API_ROUTES.ordenes}/asignar-mecanico?numeroOrden=${orderId}&mecanicoId=${mecanicoId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error al asignar el mecánico.");
      }

      const selectedMecanico = mecanicos.find(
        (mecanico) => mecanico.mecanicoId === mecanicoId
      );

      dispatch(
        assignMechanic(orderId, selectedMecanico?.nombre || "No asignado")
      );
    } catch (error) {
      console.error("Error al asignar el mecánico:", error);
    }
  };

  const handleSearch = (e) => {
    dispatch(filterOrders(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const currentOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Órdenes");
    XLSX.writeFile(wb, "ordenes.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Órdenes", 10, 10);
    doc.autoTable({
      head: [["Número de Orden", "Placa", "Servicio", "Cliente", "Estado"]],
      body: orders.map((order) => [
        order.numeroOrden,
        order.placaVehiculo,
        order.servicio,
        order.cliente,
        order.estado,
      ]),
    });
    doc.save("ordenes.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lista de Órdenes
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={exportToExcel}>Exportar a Excel</button>
        <button onClick={exportToPDF}>Exportar a PDF</button>
      </div>
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
        <div>
          <strong>Número de Orden</strong>
        </div>
        <div>
          <strong>Placa</strong>
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
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
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
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span style={{ margin: "0 10px" }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaOrdenesPage;
