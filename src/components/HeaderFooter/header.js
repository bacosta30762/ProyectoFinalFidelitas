import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./AppHeader.css";
import { logout } from "../../redux/actions/loginActions";

export default function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.loginState);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Inicio", { replace: true });
  };

  return (
    <Navbar expand="lg" className="bg-rojizo">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Lubricentro RyM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <NavDropdown title="Administrador" id="admin-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/lista-ordenes">
                    Lista de Órdenes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/reporte-ordenes">
                    Reportes de Órdenes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/marketing">
                    Marketing
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/ListaUsuario">
                    Lista Usuario
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/calendario">
                    Calendario
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Mecánico" id="mechanic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/mis-ordenes">
                    Mis Órdenes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/reporte-retroalimentacion"
                  >
                    Reportes de Retroalimentación
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Contabilidad" id="accounting-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/ingresos">
                    Ingresos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/egresos">
                    Egresos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/reportes-financieros">
                    Reportes Financieros
                  </NavDropdown.Item>
                  <Nav.Link as={NavLink} to="/calendario">
                    Disponibilidad Citas
                  </Nav.Link>
                </NavDropdown>

                <Nav.Link as={NavLink} to="/comentarios-valoraciones">
                  Opiniones
                </Nav.Link>
                <Nav.Link as={NavLink} to="/inventarios">
                  Inventarios
                </Nav.Link>

                <NavDropdown title={user.nombre} id="user-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/Perfil">
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item disabled>Rol: {user.rol}</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/Inicio">
                Inicio Sesión
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/Perfil">
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
