import React from 'react';
import NotificationForm from '../components/notifications/NotificationForm';
import NotificationList from '../components/notifications/NotificationList';
import NotificationDetail from '../components/notifications/NotificationDetail';
import NotificationSearch from '../components/notifications/NotificationSearch';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

const AdminNotificationsPage = () => {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Administrar Notificaciones</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/crear`}>Crear Notificación</Link></li>
                    <li><Link to={`${baseUrl}/buscar`}>Buscar Notificaciones</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="crear" element={<NotificationForm onSubmit={(data) => {
                    axios.post('/api/notifications', data)
                        .then(response => console.log('Notificación creada:', response.data))
                        .catch(error => console.error('Error creating notification:', error));
                }} />} />
                <Route path="buscar" element={<NotificationSearch />} />
                <Route path=":id" element={<NotificationDetail />} />
            </Routes>
        </div>
    );
};

export default AdminNotificationsPage;
