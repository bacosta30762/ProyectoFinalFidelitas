import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import MechanicOrdenList from "../components/mecanico/MechanicOrdenList";
import MechanicFeedbackReportModule from "../components/mecanico/MechanicFeedbackReportModule";

const MechanicPage = () => {
  return (
    <div>
      <h1>Mecánico</h1>
      <nav>
        <ul>
          <li>
            <Link to="/mechanic/ordenes">Mis Órdenes</Link>
          </li>
          <li>
            <Link to="/mechanic/reportes">Reporte de Retroalimentación</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="ordenes" element={<MechanicOrdenList />} />
        <Route path="reportes" element={<MechanicFeedbackReportModule />} />
      </Routes>
    </div>
  );
};

export default MechanicPage;
