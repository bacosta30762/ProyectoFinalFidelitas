// src/components/RecoverPassword.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  recoverPasswordRequest,
  recoverPasswordSuccess,
  recoverPasswordFailure,
} from "../../redux/actions/recoverPasswordActions";
import "./recuperarcontra.css";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.recoverPassword
  );

  const [email, setEmail] = useState("");

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    dispatch(recoverPasswordRequest(email));

    // Simular envío de correo
    setTimeout(() => {
      if (email === "test@example.com") {
        dispatch(recoverPasswordSuccess());
        alert("Correo de recuperación enviado (simulación).");
        navigate("/Inicio");
      } else {
        dispatch(recoverPasswordFailure("Correo no encontrado."));
      }
    }, 1000);
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Recuperar Contraseña</h1>
      <form className="recover-password-form" onSubmit={handleRecoverPassword}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="recover-password-input"
          required
        />
        <button
          type="submit"
          className="recover-password-button"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">¡Correo enviado!</div>}
    </div>
  );
};

export default RecoverPassword;
