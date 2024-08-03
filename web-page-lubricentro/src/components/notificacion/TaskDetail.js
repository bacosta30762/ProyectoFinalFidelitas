import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        axios.get(`/api/tasks/${id}`)
            .then(response => setTask(response.data))
            .catch(error => console.error('Error fetching task:', error));
    }, [id]);

    if (!task) return <div>Cargando...</div>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskDetail;
