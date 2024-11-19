import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./perfil.css";

const Profile = () => {
  const navigate = useNavigate();

  // Obtener el usuario logueado desde el estado de Redux
  const { user } = useSelector((state) => state.loginState);

  const handleEdit = () => {
    navigate(`/perfileditar/${user.id}`); // Redirigir a la página de edición con el ID del usuario
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Administrador</h2>
      <div className="profile-info">
        <div className="profile-field">
          <label>Nombre:</label>
          <p>{user?.nombre || "N/A"}</p>
        </div>
        <div className="profile-field">
          <label>Cédula:</label>
          <p>{user?.cedula || "N/A"}</p>
        </div>
        <div className="profile-field">
          <label>Correo:</label>
          <p>{user?.email || "N/A"}</p>
        </div>
        <div className="profile-field">
          <label>Teléfono:</label>
          <p>{user?.telefono || "N/A"}</p>
        </div>
        <div className="profile-field">
          <label>Método de Contacto:</label>
          <p>{user?.contactMethod || "N/A"}</p>
        </div>
      </div>

      <button id="botonmodi" className="edit-button" onClick={handleEdit}>
        Modificar
      </button>
    </div>
  );
};

export default Profile;
