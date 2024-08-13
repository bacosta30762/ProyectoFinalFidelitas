import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AdminOrderList from "../components/admin/AdminOrderList";
import AdminReportModule from "../components/admin/AdminReportModule";
import MarketingModule from "../components/admin/MarketingModule";

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
          <li>
            <Link to="/admin/marketing">Marketing</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="lista" element={<AdminOrderList />} />
        <Route path="reportes" element={<AdminReportModule />} />
        <Route path="marketing" element={<MarketingModule />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
