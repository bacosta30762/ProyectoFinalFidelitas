import React from 'react';
import { Routes, Route, Link, useResolvedPath } from 'react-router-dom';
import SubscriptionForm from '../components/marketing/SubscriptionForm';
import SubscriptionList from '../components/marketing/SubscriptionList';
import SubscriptionSearch from '../components/marketing/SubscriptionSearch';

function SubscriptionPage() {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Gestión de Suscripciones a Boletines</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/create`}>Crear Suscripción</Link></li>
                    <li><Link to={`${baseUrl}/search`}>Buscar Suscripciones</Link></li>
                    <li><Link to={`${baseUrl}`}>Listar Suscripciones</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="create" element={<SubscriptionForm />} />
                <Route path="search" element={<SubscriptionSearch />} />
                <Route index element={<SubscriptionList />} />
            </Routes>
        </div>
    );
}

export default SubscriptionPage;
