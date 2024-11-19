import React, { useState } from 'react';
import axios from 'axios';

const OrdenForm = ({ onSubmit, initialData = {} }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="servicio" value={data.servicio || ''} onChange={handleChange} placeholder="Servicio" />
      <input name="cliente" value={data.cliente || ''} onChange={handleChange} placeholder="Cliente" />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrdenForm;