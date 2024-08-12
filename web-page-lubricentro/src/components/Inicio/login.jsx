import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";



const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    navigate('/AdminPage'); 
  };


  const handleRecoverPassword = () => {
    navigate('/RecuperarContra'); 
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Cédula" className="login-input" />
        <input type="password" placeholder="Contraseña" className="login-input" />
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <div className="login-options">
        <button className="forgot-password-link" onClick={handleRecoverPassword}>
          Recuperar contraseña
        </button>
        
      </div>
    </div>
  );
};

export default Login;

