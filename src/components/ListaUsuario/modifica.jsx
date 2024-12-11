import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../redux/actions/userActions";
import "./modifica.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(id))
  );

  const [userData, setUserData] = useState({
    name: "",
    cedula: "",
    email: "",
    rol: "",
  });

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.id, userData));
    alert("Información actualizada para el usuario: " + userData.name);
    navigate("/user-list");
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar al usuario ${userData.name}?`
      )
    ) {
      dispatch(deleteUser(user.id));
      alert("Usuario eliminado");
      navigate("/user-list");
    }
  };

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Editar Usuario</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="edit-user-input"
          />
        </label>
        <label>
          Cédula:
          <input
            type="text"
            name="cedula"
            value={userData.cedula}
            onChange={handleChange}
            className="edit-user-input"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="edit-user-input"
          />
        </label>
        <label>
          Rol:
          <select
            name="rol"
            value={userData.rol}
            onChange={handleChange}
            className="edit-user-input"
          >
            <option value="Usuario">Usuario</option>
            <option value="Admin">Admin</option>
            <option value="Mecanico">Mecánico</option>
          </select>
        </label>
        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>
      <button onClick={handleDelete} className="delete-button">
        Eliminar Usuario
      </button>
    </div>
  );
};

export default EditUser;
