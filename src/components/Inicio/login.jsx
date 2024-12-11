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
import apiClient from "../../apiClient";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loginState);

  const [credentials, setCredentials] = useState({ correo: "", password: "" });
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setValidationError(""); // Reset validation error on input change
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.correo || !credentials.password) {
      setValidationError("Por favor, completa todos los campos.");
      return;
    }

    if (!validatePassword(credentials.password)) {
      setValidationError("La contraseña es incorrecta.");
      return;
    }

    dispatch(loginRequest());

    try {
      const loginResponse = await apiClient.post(
        `${API_ROUTES.users}/LoginAdmin`,
        {
          email: credentials.correo,
          password: credentials.password,
        }
      );
      console.log(loginResponse);

      const { token } = loginResponse.data;

      localStorage.setItem("token", token);

      const usersResponse = await apiClient.get(
        `${API_ROUTES.users}/lista-usuarios`
      );

      const foundUser = usersResponse.data.find(
        (user) => user.email === credentials.correo
      );

      if (!foundUser) {
        dispatch(
          loginFailure("Usuario no encontrado en la lista de usuarios.")
        );
        return;
      }

      dispatch(loginSuccess(loginResponse.data));
      console.log(foundUser);
      dispatch(saveUserData(foundUser));

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
      {(validationError || error) && (
        <div className="error-message">{validationError || error}</div>
      )}
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
