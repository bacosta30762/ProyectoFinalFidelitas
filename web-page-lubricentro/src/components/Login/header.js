import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from "react-bootstrap/Navbar";

export default function AppHeader() {
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Lubricentro RyM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin">
              Administrador
            </Nav.Link>
            <Nav.Link as={NavLink} to="/feedback">
              Retroalimentación
            </Nav.Link>
            <NavDropdown title="Contabilidad" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/ingresos">Ingresos</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/egresos">Egresos</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/reportes-financieros">Reportes Financieros</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/comentarios-valoraciones">
              Opiniones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
