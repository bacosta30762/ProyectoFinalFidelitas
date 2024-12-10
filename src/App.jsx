import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/HeaderFooter/header";
import Footer from "./components/HeaderFooter/Footer";
import ProtectedRoute from "./hoc/ProtectedRoute.jsx";

import Inicio from "./components/Inicio/login.jsx";
import RecuperarContra from "./components/Inicio/recuperarcontra.jsx";
import ListaUsuario from "./components/ListaUsuario/lista.jsx";
import Perfil from "./components/Perfil/perfil.jsx";
import ModificaRol from "./components/ListaUsuario/modifica.jsx";
import Perfileditar from "./components/Perfil/perfileditar.jsx";
import UserList from "./components/ListaUsuario/lista.jsx";
import ListaOrdenesPage from "./pages/ListaOrdenesPage.jsx";
import MechanicOrdenListPage from "./pages/MechanicOrdenListPage.jsx";
import MechanicFeedbackReportPage from "./pages/MechanicFeedbackReportPage.jsx";
import MarketingPage from "./pages/MarketingPage.jsx";
import NewsletterPage from "./pages/NewsletterPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import SubscriptionPage from "./pages/SubscriptionPage.jsx";
import FeedbackList from "./components/marketing/FeedbackList";
import IngresosPage from "./components/Contability/Ingresos.jsx";
import AgregarIngreso from "./components/Contability/AgregarIngreso.jsx";
import EditarIngreso from "./components/Contability/EditarIngreso.jsx";
import EgresosPage from "./components/Contability/Egresos.jsx";
import AgregarEgreso from "./components/Contability/AgregarEgreso.jsx";
import EditarEgreso from "./components/Contability/EditarEgreso.jsx";
import ReportesFinancieros from "./components/Contability/ReportesFinancieros.jsx";
import ComentariosValoraciones from "./components/Comentarios/ComentariosValoraciones.jsx";
import Inventarios from "./components/Inventarios/Inventarios.jsx";
import Calendario from "./components/Planificacion/Calendar.jsx";

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
      monto: 1500.0,
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
      monto: 2500.0,
      metodoPago: "Efectivo",
      proveedor: "Juan Pérez",
      numeroFactura: "-",
      comentarios: "Ninguno",
    },
  ]);

  return (
    <div className="App">
      <BrowserRouter basename="/ProyectoFinalFidelitas">
        <header id="header">
          <AppHeader />
        </header>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/Inicio/" element={<Inicio />} />
          <Route path="/RecuperarContra/*" element={<RecuperarContra />} />

          {/* Rutas protegidas */}
          <Route
            path="/ListaUsuario/*"
            element={
              <ProtectedRoute>
                <ListaUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Perfil/"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute>
                <ModificaRol />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfileditar/:id"
            element={
              <ProtectedRoute>
                <Perfileditar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lista-ordenes/*"
            element={
              <ProtectedRoute>
                <ListaOrdenesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-ordenes/*"
            element={
              <ProtectedRoute>
                <MechanicOrdenListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reporte-retroalimentacion/*"
            element={
              <ProtectedRoute>
                <MechanicFeedbackReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/*"
            element={
              <ProtectedRoute>
                <MarketingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/newsletters/*"
            element={
              <ProtectedRoute>
                <NewsletterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/feedback/*"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/subscriptions/*"
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingresos"
            element={
              <ProtectedRoute>
                <IngresosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agregar-ingreso"
            element={
              <ProtectedRoute>
                <AgregarIngreso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-ingreso/:id"
            element={
              <ProtectedRoute>
                <EditarIngreso ingresos={ingresos} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/egresos"
            element={
              <ProtectedRoute>
                <EgresosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agregar-egreso"
            element={
              <ProtectedRoute>
                <AgregarEgreso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-egreso/:id"
            element={
              <ProtectedRoute>
                <EditarEgreso egresos={egresos} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportes-financieros"
            element={
              <ProtectedRoute>
                <ReportesFinancieros ingresos={ingresos} egresos={egresos} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
          <Route
            path="/inventarios"
            element={
              <ProtectedRoute>
                <Inventarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendario"
            element={
              <ProtectedRoute>
                <Calendario />
              </ProtectedRoute>
            }
          />
        </Routes>
        <footer id="footer">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
