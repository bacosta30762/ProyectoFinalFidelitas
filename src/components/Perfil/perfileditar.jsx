import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/actions/loginActions";
import "./perfileditar.css";

const Perfileditar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener usuario desde Redux
  const { user, loading, error } = useSelector((state) => state.loginState);

  const [updatedData, setUpdatedData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
  });

  // Al montar el componente, cargar los datos del usuario
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Sincronizar el estado local con los datos del usuario
  useEffect(() => {
    if (user) {
      setUpdatedData({
        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        correo: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(user.cedula, updatedData));
    navigate("/Perfil");
  };

  // Mostrar mensaje mientras carga
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Mostrar error si ocurre
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Validación adicional si no hay datos
  if (!user) {
    return <div className="error">No se encontraron datos del usuario.</div>;
  }

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Editar Perfil</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={updatedData.nombre}
            onChange={handleChange}
            className="edit-user-input"
            disabled
          />
        </label>
        <label>
          Apellidos:
          <input
            type="text"
            name="apellidos"
            value={updatedData.apellidos}
            onChange={handleChange}
            className="edit-user-input"
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={updatedData.correo}
            onChange={handleChange}
            className="edit-user-input"
            required
          />
        </label>
        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Perfileditar;
