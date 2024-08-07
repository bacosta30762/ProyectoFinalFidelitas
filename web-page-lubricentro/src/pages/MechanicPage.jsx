import React from 'react';
import OrdenList from '../components/orden/OrdenList';
import OrdenDetail from '../components/orden/OrdenDetail';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';

const MechanicPage = () => {
  const resolvedPath = useResolvedPath();
  const baseUrl = resolvedPath.pathname;

  return (
    <div>
      <h1>Mecánico</h1>
      <nav>
        <ul>
          <li><Link to={`${baseUrl}/mis-ordenes`}>Mis Órdenes</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="mis-ordenes" element={<OrdenList />} />
        <Route path=":id" element={<OrdenDetail />} />
      </Routes>
    </div>
  );
};

export default MechanicPage;
