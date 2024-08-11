import React, { useState } from "react";
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
import IngresosPage from './components/Contability/Ingresos';
import AgregarIngreso from './components/Contability/AgregarIngreso';
import EditarIngreso from './components/Contability/EditarIngreso';
import EgresosPage from "./components/Contability/Egresos";
import AgregarEgreso from "./components/Contability/AgregarEgreso";
import EditarEgreso from "./components/Contability/EditarEgreso";
import ReportesFinancieros from './components/Contability/ReportesFinancieros';
import ComentariosValoraciones from './components/Comentarios/ComentariosValoraciones';   

function App() {
    const [ingresos] = useState([
        {
            id: 1,
            fecha: "2023-08-01",
            descripcion: "Venta de lubricante",
            tipo: "Venta",
            cantidad: 10,
            precioUnitario: 15000.0,
            total: 150000.0,
            metodoPago: "Efectivo",
            cliente: "Juan Pérez",
            factura: "F12345",
            comentarios: "Ninguno",
        },
        {
            id: 2,
            fecha: "2023-08-02",
            descripcion: "Servicio de cambio de aceite",
            tipo: "Servicio",
            cantidad: 1,
            precioUnitario: 20000.0,
            total: 20000.0,
            metodoPago: "Tarjeta",
            cliente: "María López",
            factura: "F12346",
            comentarios: "Ninguno",
        },
    ]);

    const [egresos] = useState([
        {
      id: 1,
      fecha: "2023-08-01",
      categoria: "Compra de Materiales",
      descripcion: "Compra de cemento",
      monto: 1500.00,
      metodoPago: "Transferencia",
      proveedor: "Cementos XYZ",
      numeroFactura: "F12345",
      comentarios: "Ninguno",
    },
    {
      id: 2,
      fecha: "2023-08-02",
      categoria: "Salarios",
      descripcion: "Pago de salario Julio",
      monto: 2500.00,
      metodoPago: "Efectivo",
      proveedor: "Juan Pérez",
      numeroFactura: "-",
      comentarios: "Ninguno",
    },
    ]);

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
                    <Route path="/marketing/subscriptions/*" element={<SubscriptionPage />} />
                    <Route path="/marketing/feedback" element={<FeedbackList />} />
                    <Route path="/ingresos" element={<IngresosPage />} />
                    <Route path="/agregar-ingreso" element={<AgregarIngreso />} />
                    <Route path="/editar-ingreso/:id" element={<EditarIngreso ingresos={ingresos} />} />
                    <Route path="/egresos" element={<EgresosPage />} />
                    <Route path="/agregar-egreso" element={<AgregarEgreso />} />
                    <Route path="/editar-egreso/:id" element={<EditarEgreso egresos={egresos} />} /> 
                    <Route path="/reportes-financieros" element={<ReportesFinancieros ingresos={ingresos} egresos={egresos} />} />
                    <Route path="/comentarios-valoraciones" element={<ComentariosValoraciones />} />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;

