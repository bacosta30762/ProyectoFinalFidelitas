import React from 'react';
import NotificationList from '../components/notificacion/NotificationList';
import NotificationDetail from '../components/notificacion/NotificationDetail';
import NotificationForm from '../components/notificacion/NotificationForm';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

const UserNotificationsPage = () => {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Mis Notificaciones</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/notificaciones`}>Ver Notificaciones</Link></li>
                    <li><Link to={`${baseUrl}/crear`}>Crear Notificación</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="notificaciones" element={<NotificationList />} />
                <Route path="crear" element={<NotificationForm onSubmit={(data) => {
                    axios.post('/api/notifications', data)
                        .then(response => console.log('Notificación creada:', response.data))
                        .catch(error => console.error('Error creating notification:', error));
                }} />} />
                <Route path=":id" element={<NotificationDetail />} />
            </Routes>
        </div>
    );
};

export default UserNotificationsPage;
