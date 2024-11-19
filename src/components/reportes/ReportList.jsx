import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get('/api/reports');
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <ul>
      {reports.map((report) => (
        <li key={report.id}>
          <Link to={`/reports/${report.id}`}>{report.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ReportList;
