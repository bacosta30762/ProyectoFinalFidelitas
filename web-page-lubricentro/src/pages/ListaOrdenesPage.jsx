import React, { useState } from "react";

const ListaOrdenesPage = () => {
  // Datos fake de mecánicos
  const mecanicos = [
    "Luis Martínez",
    "Carlos Ruiz",
    "Fernando Torres",
    "Miguel Hernández",
    "Ana Fernández",
  ];

  // Datos fake para las órdenes
  const ordenes = [
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

  // Estado para manejar las órdenes y la búsqueda
  const [ordenesConMecanicos, setOrdenesConMecanicos] = useState(ordenes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMecanicos, setSelectedMecanicos] = useState({});

  // Función para manejar el cambio de mecánico seleccionado
  const handleMecanicoSelect = (id, mecanico) => {
    setSelectedMecanicos({
      ...selectedMecanicos,
      [id]: mecanico,
    });
  };

  // Función para confirmar la asignación del mecánico
  const handleMecanicoAssign = (id) => {
    const mecanico = selectedMecanicos[id];
    if (mecanico) {
      setOrdenesConMecanicos(
        ordenesConMecanicos.map((orden) =>
          orden.id === id ? { ...orden, mecanicoAsignado: mecanico } : orden
        )
      );
    }
  };

  // Filtrar las órdenes según el término de búsqueda
  const filteredOrdenes = ordenesConMecanicos.filter(
    (orden) =>
      orden.numeroOrden.includes(searchTerm) ||
      orden.placaVehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lista de Órdenes
      </h2>
      <input
        type="text"
        placeholder="Buscar órdenes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
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
          <strong>Asignar Mecánico</strong>
        </div>
        <div>
          <strong>Acciones</strong>
        </div>
        <div>
          <strong>Mecánico Asignado</strong>
        </div>

        {filteredOrdenes.length > 0 ? (
          filteredOrdenes.map((orden) => (
            <React.Fragment key={orden.id}>
              <div>{orden.numeroOrden}</div>
              <div>{orden.placaVehiculo}</div>
              <div>{orden.servicio}</div>
              <div>{orden.cliente}</div>
              <div>
                <select
                  value={selectedMecanicos[orden.id] || ""}
                  onChange={(e) =>
                    handleMecanicoSelect(orden.id, e.target.value)
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
              <div>
                <button
                  onClick={() => handleMecanicoAssign(orden.id)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Asignar
                </button>
              </div>
              <div>{orden.mecanicoAsignado || "No asignado"}</div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ gridColumn: "span 7", textAlign: "center" }}>
            No se encontraron órdenes.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaOrdenesPage;
