import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdenList = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    axios.get('/api/ordenes')
      .then(response => setOrdenes(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Órdenes de Servicio</h1>
      <ul>
        {ordenes.map(orden => (
          <li key={orden.id}>{orden.servicio} - {orden.cliente}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenList;