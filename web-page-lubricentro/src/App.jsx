import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/HeaderFooter/header";
import UserPage from "./pages/UserPage";
import UserNotificationsPage from "./pages/UserNotificationsPage";
import MarketingPage from "./pages/MarketingPage";
import NewsletterPage from "./pages/NewsletterPage";
import FeedbackPage from "./pages/FeedbackPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import FeedbackList from "./components/marketing/FeedbackList";
import IngresosPage from "./components/Contability/Ingresos";
import AgregarIngreso from "./components/Contability/AgregarIngreso";
import EditarIngreso from "./components/Contability/EditarIngreso";
import EgresosPage from "./components/Contability/Egresos";
import AgregarEgreso from "./components/Contability/AgregarEgreso";
import EditarEgreso from "./components/Contability/EditarEgreso";
import ReportesFinancieros from "./components/Contability/ReportesFinancieros";
import ComentariosValoraciones from "./components/Comentarios/ComentariosValoraciones";
import Inventarios from "./components/Inventarios/ListGroup";
import Inicio from "./components/Inicio/login.jsx";
import ListaUsuario from "./components/ListaUsuario/lista.jsx";
import ModificaRol from "./components/ListaUsuario/modifica.jsx";
import Footer from "./components/HeaderFooter/Footer";
import ListaOrdenesPage from "./pages/ListaOrdenesPage.jsx";
import ReporteOrdenesPage from "./pages/ReporteOrdenesPage.jsx";
import RecuperarContra from "./components/Inicio/recuperarcontra.jsx";
import Calendario from "./components/Planificacion/Calendar";
import MechanicOrdenListPage from "./pages/MechanicOrdenListPage.jsx";
import MechanicFeedbackReportPage from "./pages/MechanicFeedbackReportPage.jsx";
import Perfil from "./components/Perfil/perfil.jsx";
import Perfileditar from "./components/Perfil/perfileditar.jsx";

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
      <Router>
        <header id="header">
          <AppHeader />
        </header>
        <Routes>
          <Route path="/Inicio/" element={<Inicio />} />
          <Route path="/RecuperarContra/*" element={<RecuperarContra />} />

          <Route path="/ListaUsuario/*" element={<ListaUsuario/>} />
          <Route path="/Perfil/" element={<Perfil/>} />
          <Route path="/edit-user/:id" element={<ModificaRol />} />
          <Route path="/perfileditar/:id" element={<Perfileditar />} />
          <Route path="/lista-ordenes/*" element={<ListaOrdenesPage />} />
          <Route path="/reporte-ordenes/*" element={<ReporteOrdenesPage />} />
          <Route
            path="/mis-ordenes/*"
            element={<MechanicFeedbackReportPage />}
          />
          <Route
            path="/reporte-retroalimentacion/*"
            element={<MechanicOrdenListPage />}
          />
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
          <Route
            path="/editar-ingreso/:id"
            element={<EditarIngreso ingresos={ingresos} />}
          />
          <Route path="/egresos" element={<EgresosPage />} />
          <Route path="/agregar-egreso" element={<AgregarEgreso />} />
          <Route
            path="/editar-egreso/:id"
            element={<EditarEgreso egresos={egresos} />}
          />
          <Route
            path="/reportes-financieros"
            element={
              <ReportesFinancieros ingresos={ingresos} egresos={egresos} />
            }
          />
          <Route
            path="/comentarios-valoraciones"
            element={<ComentariosValoraciones />}
          />
          <Route path="/inventarios" element={<Inventarios />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </Router>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
