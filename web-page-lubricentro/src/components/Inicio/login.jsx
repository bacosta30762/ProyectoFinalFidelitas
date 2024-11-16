// src/components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../redux/actions/loginActions";
import { API_ROUTES } from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loginState);

  const [credentials, setCredentials] = useState({ correo: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      const response = await fetch(`${API_ROUTES.users}/LoginAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: credentials.correo,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(
          loginFailure(errorData.errors || "Cédula o contraseña incorrecta")
        );
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Guardar token en localStorage
        dispatch(loginSuccess(data));
        navigate("/"); // Redirigir al inicio
      }
    } catch (error) {
      dispatch(loginFailure("Error en la conexión."));
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
          name="correo"
          placeholder="Correo"
          value={credentials.correo}
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
