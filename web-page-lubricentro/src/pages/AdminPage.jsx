import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AdminOrderList from "../components/admin/AdminOrderList";
import AdminReportModule from "../components/admin/AdminReportModule";

const AdminPage = () => {
  return (
    <div>
      <h1>Administrador</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/lista">Lista de Órdenes</Link>
          </li>
          <li>
            <Link to="/admin/reportes">Reportes de Órdenes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="lista" element={<AdminOrderList />} />
        <Route path="reportes" element={<AdminReportModule />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
