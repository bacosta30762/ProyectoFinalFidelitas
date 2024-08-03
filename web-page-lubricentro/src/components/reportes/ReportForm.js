import React, { useState } from 'react';
import axios from 'axios';

function ReportForm({ report, onSubmit }) {
  const [data, setData] = useState(report || { title: '', description: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reports', data);
      alert('Reporte generado con éxito');
      onSubmit(response.data);
    } catch (error) {
      alert('Error al generar el reporte: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="Título del reporte"
        required
      />
      <textarea
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Descripción del reporte"
        required
      />
      <button type="submit">Guardar Reporte</button>
    </form>
  );
}

export default ReportForm;
