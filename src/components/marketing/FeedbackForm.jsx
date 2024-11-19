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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = feedbackId ? 'put' : 'post';
        const url = feedbackId ? `/api/feedback/${feedbackId}` : '/api/feedback';

        try {
            const response = await axios[method](url, feedback);
            alert(`Feedback ${feedbackId ? 'actualizado' : 'creado'} con éxito!`);
            // Opcional: redireccionar o realizar otra acción
        } catch (error) {
            alert(`Error al ${feedbackId ? 'actualizar' : 'crear'} el feedback: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-content">Contenido del Feedback:</label>
            <textarea
                id="feedback-content"
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
