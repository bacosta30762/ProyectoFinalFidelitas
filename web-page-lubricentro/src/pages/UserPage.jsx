import React from 'react';
import OrdenForm from '../components/orden/OrdenForm';
import OrdenList from '../components/orden/OrdenList';
import OrdenDetail from '../components/orden/OrdenDetail';
import OrdenSearch from '../components/orden/OrdenSearch';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const resolvedPath = useResolvedPath();
  const baseUrl = resolvedPath.pathname;

  return (
    <div>
      <h1>Usuario</h1>
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

export default UserPage;
