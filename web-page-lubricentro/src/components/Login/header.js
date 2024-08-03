import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppHeader() {
    return (
        <Navbar bg="light" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Lubricentro RyM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Administrador</Nav.Link>
                        <Nav.Link as={NavLink} to="/mechanic">Mecánico</Nav.Link>
                        <Nav.Link as={NavLink} to="/user">Usuario</Nav.Link>
                        <Nav.Link as={NavLink} to="/user/notifications">Notificaciones</Nav.Link> {/* Agrega enlace a Notificaciones */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
