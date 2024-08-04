import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        // Función para cargar las retroalimentaciones desde el servidor
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('/api/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                alert('Error al cargar las retroalimentaciones: ' + error.message);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div>
            <h1>Lista de Retroalimentaciones</h1>
            {feedbacks.length > 0 ? (
                <ul>
                    {feedbacks.map((feedback) => (
                        <li key={feedback.id}>
                            <Link to={`/marketing/feedback/${feedback.id}`}>{feedback.content}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay retroalimentaciones disponibles.</p>
            )}
        </div>
    );
}

export default FeedbackList;
