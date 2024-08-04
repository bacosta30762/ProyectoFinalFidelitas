import React from 'react';
import { Routes, Route, Link, useResolvedPath } from 'react-router-dom';
import FeedbackForm from '../components/marketing/FeedbackForm';
import FeedbackList from '../components/marketing/FeedbackList';

function FeedbackPage() {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Retroalimentaciones de Marketing</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/create`}>Crear Retroalimentación</Link></li>
                    <li><Link to={`${baseUrl}`}>Ver Retroalimentaciones</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="create" element={<FeedbackForm />} />
                <Route index element={<FeedbackList />} />
            </Routes>
        </div>
    );
}

export default FeedbackPage;
