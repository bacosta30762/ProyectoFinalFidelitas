import React from 'react';
import OrdenForm from '../components/OrdenForm';
import OrdenList from '../components/OrdenList';
import OrdenDetail from '../components/OrdenDetail';
import OrdenSearch from '../components/OrdenSearch';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const resolvedPath = useResolvedPath();
  const baseUrl = resolvedPath.pathname;

  return (
    <div>
      <h1>Administrador</h1>
      <nav>
        <ul>
          <li><Link to={`${baseUrl}/crear`}>Crear Orden</Link></li>
          <li><Link to={`${baseUrl}/buscar`}>Buscar Órdenes</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="crear" element={<OrdenForm onSubmit={(data) => {
          axios.post('/api/ordenes', data)
            .then(response => console.log('Orden creada:', response.data))
            .catch(error => console.error('Error creating order:', error));
        }} />} />
        <Route path="buscar" element={<OrdenSearch />} />
        <Route path=":id" element={<OrdenDetail />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
