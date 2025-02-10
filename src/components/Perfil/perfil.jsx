import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../redux/actions/loginActions";
import "./perfil.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loginState);

  useEffect(() => {
    if (user?.cedula) {
      dispatch(fetchUserProfile(user.cedula));
    }
  }, [dispatch, user?.cedula]);

  const handleEdit = () => {
    console.log("Editar perfil de usuario:", user);
    // 🔹 Pasar el ID (cedula) en la URL
    navigate(`/perfileditar/${user.cedula}`);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil</h2>
      {user ? (
        <div className="profile-info">
          <div className="profile-field">
            <label>Nombre:</label>
            <p>{user.nombre}</p>
          </div>
          <div className="profile-field">
            <label>Cédula:</label>
            <p>{user.cedula}</p>
          </div>
          <div className="profile-field">
            <label>Correo:</label>
            <p>{user.email}</p>
          </div>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <button id="botonmodi" className="edit-button" onClick={handleEdit}>
        Modificar
      </button>
    </div>
  );
};

export default Profile;
