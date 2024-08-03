import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrdenDetail = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    axios.get(`/api/ordenes/${id}`)
      .then(response => setOrden(response.data))
      .catch(error => console.error('Error fetching order:', error));
  }, [id]);

  if (!orden) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detalle de Orden de Servicio</h1>
      <p>Servicio: {orden.servicio}</p>
      <p>Cliente: {orden.cliente}</p>
      <p>Estado: {orden.estado}</p>
    </div>
  );
};

export default OrdenDetail;