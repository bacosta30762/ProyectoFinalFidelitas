import React, { useState } from "react";
import axios from "axios";

const OrdenSearch = () => {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/api/ordenes/search?query=${query}`)
      .then((response) => setResultados(response.data))
      .catch((error) => console.error("Error searching orders:", error));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar órdenes"
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {resultados.map((orden) => (
          <li key={orden.id}>
            {orden.servicio} - {orden.cliente}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenSearch;
