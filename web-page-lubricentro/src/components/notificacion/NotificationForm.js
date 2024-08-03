import React from 'react';

const NotificationForm = ({ onSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Título" required />
            <textarea name="message" placeholder="Mensaje" required />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default NotificationForm;
