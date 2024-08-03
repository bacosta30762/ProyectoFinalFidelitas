import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReportDetail() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(`/api/reports/${reportId}`);
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    fetchReport();
  }, [reportId]);

  if (!report) return <p>Loading report details...</p>;

  return (
    <div>
      <h1>{report.title}</h1>
      <p>{report.description}</p>
      {/* Botones para editar y eliminar, por implementar */}
    </div>
  );
}

export default ReportDetail;
