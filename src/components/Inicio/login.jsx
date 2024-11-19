import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  saveUserData,
} from "../../redux/actions/loginActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { API_ROUTES } from "../../api";

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
      // Realizar el login inicial
      const loginResponse = await fetch(`${API_ROUTES.users}/LoginAdmin`, {
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

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        dispatch(
          loginFailure(errorData.errors || "Cédula o contraseña incorrecta")
        );
        return;
      }

      // Login exitoso, obtener token o datos preliminares
      const loginData = await loginResponse.json();

      // Obtener la lista de usuarios para comparar credenciales
      const usersResponse = await fetch(`${API_ROUTES.users}/lista-usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!usersResponse.ok) {
        throw new Error("Error al obtener la lista de usuarios.");
      }

      const usersData = await usersResponse.json();

      // Buscar un usuario que coincida con las credenciales ingresadas
      const foundUser = usersData.find(
        (user) => user.email === credentials.correo
      );

      if (!foundUser) {
        dispatch(
          loginFailure("Usuario no encontrado en la lista de usuarios.")
        );
        return;
      }

      // Guardar los datos del usuario logueado en Redux
      dispatch(loginSuccess(loginData)); // Datos obtenidos del login
      dispatch(saveUserData(foundUser)); // Datos obtenidos de la lista de usuarios

      // Redirigir al perfil
      navigate("/Perfil", { replace: true });
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
