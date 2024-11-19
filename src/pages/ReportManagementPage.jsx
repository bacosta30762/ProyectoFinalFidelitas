import React from 'react';
import ReportForm from '../components/ReportForm';
import { useParams } from 'react-router-dom';

function ReportManagementPage() {
    const { reportId } = useParams(); // Utiliza los parámetros de la URL para determinar si estás editando un reporte existente

    return (
        <div>
            <h1>{reportId ? "Editar Reporte" : "Crear Reporte"}</h1>
            <ReportForm reportId={reportId} />
        </div>
    );
}

export default ReportManagementPage;
