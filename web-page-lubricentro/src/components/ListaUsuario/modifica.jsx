import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./modifica.css";

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    name: '',
    cedula: '',
    email: '',
    rol: ''
  });

  
  React.useEffect(() => {

    const fetchedUser = {
      name: 'Juan Perez',
      cedula: '123456789',
      email: 'juan@example.com',
      rol: 'Usuario'
    };
    setUserData(fetchedUser);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Información actualizada para el usuario: ' + userData.name);
    navigate('/');
  };

  const handleDelete = () => {
   
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${userData.name}?`)) {
      
      alert('Usuario eliminado');
      navigate('/'); 
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
        <button type="submit" className="save-button">Guardar Cambios</button>
      </form>
      <button onClick={handleDelete} className="delete-button">Eliminar Usuario</button>
    </div>
  );
};

export default EditUser;
