import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/Login/header";
import AdminPage from "./pages/AdminPage";
import MechanicPage from "./pages/MechanicPage";
import UserPage from "./pages/UserPage";
import UserNotificationsPage from "./pages/UserNotificationsPage";
import MarketingPage from "./pages/MarketingPage";
import NewsletterPage from "./pages/NewsletterPage";
import FeedbackPage from "./pages/FeedbackPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import FeedbackList from "./components/marketing/FeedbackList";
import IngresosPage from './components/Contability/Ingresos'
import AgregarIngreso from './components/Contability/AgregarIngreso';

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
          <Route path="notifications" element={<UserNotificationsPage />} />
          <Route path="/marketing/*" element={<MarketingPage />} />
          <Route path="/marketing/newsletters/*" element={<NewsletterPage />} />
          <Route path="/marketing/feedback/*" element={<FeedbackPage />} />
          <Route
            path="/marketing/subscriptions/*"
            element={<SubscriptionPage />}
          />
          <Route path="/marketing/feedback" element={<FeedbackList />} />
          <Route path="/ingresos" element={<IngresosPage />} />
          <Route path="/agregar-ingreso" element={<AgregarIngreso />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
