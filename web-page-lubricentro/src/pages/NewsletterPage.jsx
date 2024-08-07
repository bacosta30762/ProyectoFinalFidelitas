import React from 'react';
import { Routes, Route, Link, useResolvedPath } from 'react-router-dom';
import NewsletterForm from '../components/marketing/NewsletterForm';
import NewsletterList from '../components/marketing/NewsletterList';
import NewsletterSearch from '../components/marketing/NewsletterSearch';

function NewsletterPage() {
    const resolvedPath = useResolvedPath();
    const baseUrl = resolvedPath.pathname;

    return (
        <div>
            <h1>Boletines Informativos</h1>
            <nav>
                <ul>
                    <li><Link to={`${baseUrl}/create`}>Crear Boletín</Link></li>
                    <li><Link to={`${baseUrl}/search`}>Buscar Boletines</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="create" element={<NewsletterForm />} />
                <Route path="search" element={<NewsletterSearch />} />
                <Route index element={<NewsletterList />} />
            </Routes>
        </div>
    );
}

export default NewsletterPage;
