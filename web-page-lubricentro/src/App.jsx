import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/Login/header';
import AdminPage from './pages/AdminPage';
import MechanicPage from './pages/MechanicPage';
import UserPage from './pages/UserPage';

function App() {
    return (
        <div className="App">
            <Router>
                <header id="header">
                    <AppHeader />
                </header>
                <Routes>
                    <Route path="/admin/*" element={<AdminPage />} />
                    <Route path="/mechanic/*" element={<MechanicPage />} />
                    <Route path="/user/*" element={<UserPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
