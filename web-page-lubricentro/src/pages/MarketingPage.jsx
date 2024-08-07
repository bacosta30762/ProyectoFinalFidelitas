import React from 'react';
import { Link } from 'react-router-dom';

function MarketingPage() {
    return (
        <div>
            <h1>Centro de Marketing</h1>
            <nav>
                <ul>
                    <li><Link to="/marketing/newsletters">Gestionar Boletines</Link></li>
                    <li><Link to="/marketing/feedback">Gestionar Retroalimentaciones</Link></li>
                    <li><Link to="/marketing/subscriptions">Gestionar Suscripciones</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default MarketingPage;
