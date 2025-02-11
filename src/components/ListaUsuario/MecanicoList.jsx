import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./listamecanicos.css";
import apiClient from "../../apiClient";
import { API_ROUTES } from "../../api";

const ITEMS_PER_PAGE = 5;

const MecanicoList = () => {
  const navigate = useNavigate();
  const [mecanicos, setMecanicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMecanico, setSelectedMecanico] = useState(null); // Para almacenar el mecánico seleccionado

  const serviciosEstaticos = [
    { id: 1, nombre: "Cambio de aceite" },
    { id: 2, nombre: "Mecánica rápida" },
    { id: 3, nombre: "Revisión y cambio de llantas" }
  ];

  const fetchMecanicos = async () => {
  try {
    const response = await apiClient.get(`${API_ROUTES.mecanicos}/obtener-mecanicos`);
    const mecanicoData = response.data.map((mecanico, index) => ({
      id: index + 1,
      nombre: mecanico.nombre,
      apellidos: mecanico.apellidos,
      cedula: mecanico.cedula,
      servicios: mecanico.servicios.join(", "),
      usuarioId: mecanico.usuarioId,
    }));
    setMecanicos(mecanicoData);
  } catch (error) {
    console.error("Error al obtener la lista de mecánicos:", error);
    setError("No se pudo cargar la lista de mecánicos.");
  }
};

useEffect(() => {
  fetchMecanicos();
}, []);

  const filteredMecanicos = mecanicos.filter(
    (mecanico) =>
      mecanico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mecanico.cedula.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredMecanicos.length / ITEMS_PER_PAGE);

  const paginatedMecanicos = filteredMecanicos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next" ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  };

  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceId)
        ? prevServices.filter((id) => id !== serviceId)
        : [...prevServices, serviceId]
    );
  };

  const handleSaveServices = async () => {
    if (selectedMecanico) {
      try {
        await apiClient.post(
          `${API_ROUTES.mecanicos}/asignar-servicios/${selectedMecanico.usuarioId}`,
          selectedServices
        );
        setIsModalOpen(false); // Cerrar el modal
        setSelectedServices([]); // Limpiar selección
        setSelectedMecanico(null); // Limpiar mecánico seleccionado

         // Volver a obtener los mecánicos para actualizar la lista
        await fetchMecanicos();

        alert("Servicios asignados con éxito.");
      } catch (error) {
        console.error("Error al asignar los servicios:", error);
        alert("Hubo un error al asignar los servicios.");
      }
    }
  };

  return (
    <div className="mecanico-list-container">
      <h2 className="mecanico-list-title">Lista de Mecánicos</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="mecanico-list">
        <div className="mecanico-list-header">
          <span>Nombre</span>
          <span>Apellidos</span>
          <span>Cédula</span>
          <span>Servicios</span>
          <span>Acciones</span>
        </div>
        {paginatedMecanicos.map((mecanico) => (
          <div key={mecanico.id} className="mecanico-list-row">
            <span>{mecanico.nombre}</span>
            <span>{mecanico.apellidos}</span>
            <span>{mecanico.cedula}</span>
            <span className="mecanico-servicios">{mecanico.servicios}</span>
            <button
              onClick={() => {
                setSelectedMecanico(mecanico);
                setIsModalOpen(true); // Abrir el modal
              }}
              className="edit-button"
            >
              Modificar
            </button>
          </div>
        ))}
      </div>

      {/* Modal para seleccionar servicios */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Seleccionar Servicios</h3>
            {serviciosEstaticos.map((servicio) => (
              <div key={servicio.id} className="service-checkbox">
                <input
                  type="checkbox"
                  id={`service-${servicio.id}`}
                  checked={selectedServices.includes(servicio.id)}
                  onChange={() => handleServiceSelection(servicio.id)}
                />
                <label htmlFor={`service-${servicio.id}`}>{servicio.nombre}</label>
              </div>
            ))}
            <div className="button-container">
            <button onClick={handleSaveServices} className="save-button">
              Guardar
            </button>
            <button onClick={() => setIsModalOpen(false)} className="close-button">
              Cerrar
            </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MecanicoList;
