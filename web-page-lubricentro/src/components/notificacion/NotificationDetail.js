import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NotificationDetail = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        axios.get(`/api/notifications/${id}`)
            .then(response => setNotification(response.data))
            .catch(error => console.error('Error fetching notification:', error));
    }, [id]);

    if (!notification) return <div>Cargando...</div>;

    return (
        <div>
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
        </div>
    );
};

export default NotificationDetail;
