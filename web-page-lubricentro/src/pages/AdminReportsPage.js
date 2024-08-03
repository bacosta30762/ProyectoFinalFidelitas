import React from 'react';
import ReportList from '../components/ReportList';
import { Link } from 'react-router-dom';

function AdminReportsPage() {
    return (
        <div>
            <h1>Administrar Reportes</h1>
            <Link to="/reports/new">Crear Nuevo Reporte</Link>
            <ReportList />
        </div>
    );
}

export default AdminReportsPage;
