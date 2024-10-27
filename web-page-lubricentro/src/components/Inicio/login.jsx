// src/components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../redux/actions/loginActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loginState);

  const [credentials, setCredentials] = useState({ cedula: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));

    // Simular autenticación para esta demo
    if (credentials.cedula === "123" && credentials.password === "admin") {
      dispatch(loginSuccess({ cedula: credentials.cedula }));
      navigate("/");
    } else {
      dispatch(loginFailure("Cédula o contraseña incorrecta"));
    }
  };

  const handleRecoverPassword = () => {
    navigate("/RecuperarContra");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={credentials.cedula}
          onChange={handleInputChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleInputChange}
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="login-options">
        <button
          className="forgot-password-link"
          onClick={handleRecoverPassword}
        >
          Recuperar contraseña
        </button>
      </div>
    </div>
  );
};

export default Login;
