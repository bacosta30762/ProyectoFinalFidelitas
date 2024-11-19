import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('/api/feedback')
            .then(response => {
                setFeedbacks(response.data);
            })
            .catch(() => {
                console.error('Error fetching feedbacks');
            });
    }, []);

    return (
        <div>
            <h1>Lista de Feedbacks</h1>
            <ul>
                {feedbacks.map((fb) => (
                    <li key={fb.id}>
                        <Link to={`/feedback/${fb.id}`}>{fb.content}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackList;
