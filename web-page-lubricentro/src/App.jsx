import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/Login/header';
import AdminPage from './pages/AdminPage';
import MechanicPage from './pages/MechanicPage';
import UserPage from './pages/UserPage';
import UserNotificationsPage from './pages/UserNotificationsPage';

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
                    <Route path="/user/*" element={<UserPage />}>
                    <Route path="notifications" element={<UserNotificationsPage />} /> {/* Agrega la subruta para las notificaciones */}
                    </Route>                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;
