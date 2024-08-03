import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get('/api/notifications')
            .then(response => setNotifications(response.data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    return (
        <ul>
            {notifications.map(notification => (
                <li key={notification.id}>{notification.title}</li>
            ))}
        </ul>
    );
};

export default NotificationList;
