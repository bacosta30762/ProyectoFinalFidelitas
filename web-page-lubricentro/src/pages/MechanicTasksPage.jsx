import React from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskDetail from '../components/tasks/TaskDetail';
import TaskSearch from '../components/tasks/TaskSearch';
import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

const MechanicTasksPage = () => {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Tareas de Mecánicos</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/mis-tareas`}>Mis Tareas</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="mis-tareas" element={<TaskList />} />
                <Route path=":id" element={<TaskDetail />} />
            </Routes>
        </div>
    );
};

export default MechanicTasksPage;
