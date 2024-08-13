import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AdminOrderList from "../components/admin/AdminOrderList";

const AdminPage = () => {
  return (
    <div>
      <h1>Administrador</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/lista">Lista de Órdenes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="lista" element={<AdminOrderList />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
