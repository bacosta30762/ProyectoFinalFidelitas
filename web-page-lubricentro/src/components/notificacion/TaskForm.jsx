import React from 'react';

const TaskForm = ({ onSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Título" required />
            <textarea name="description" placeholder="Descripción" required />
            <button type="submit">Crear Tarea</button>
        </form>
    );
};

export default TaskForm;
