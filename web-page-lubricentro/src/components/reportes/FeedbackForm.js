import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackForm({ feedbackId }) {
    const [feedback, setFeedback] = useState({ content: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (feedbackId) {
            setLoading(true);
            axios.get(`/api/feedback/${feedbackId}`)
                .then(response => {
                    setFeedback(response.data);
                    setLoading(false);
                })
                .catch(() => alert('Error al cargar el feedback'));
        }
    }, [feedbackId]);

    const handleChange = (event) => {
        setFeedback({ ...feedback, content: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const method = feedbackId ? 'put' : 'post';
        const url = feedbackId ? `/api/feedback/${feedbackId}` : '/api/feedback';

        axios[method](url, feedback)
            .then(() => {
                alert(`Feedback ${feedbackId ? 'actualizado' : 'creado'} con éxito`);
            })
            .catch(() => {
                alert(`Error al ${feedbackId ? 'actualizar' : 'crear'} el feedback`);
            });
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="content"
                value={feedback.content}
                onChange={handleChange}
                required
            />
            <button type="submit">Guardar Feedback</button>
        </form>
    );
}

export default FeedbackForm;
