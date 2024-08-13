import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./lista.css";

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Perez', cedula: '123456789', email: 'juan@example.com', rol: 'Usuario' },
    { id: 2, name: 'Maria Gomez', cedula: '987654321', email: 'maria@example.com', rol: 'Mecanico' },
    { id: 3, name: 'Carlos Ruiz', cedula: '112233445', email: 'carlos@example.com', rol: 'Administrador' },
  ]);

  const navigate = useNavigate();

  const handleModify = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Lista de Usuarios</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-list-item">
            <div  className="user-info">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Cédula:</strong> {user.cedula}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.rol}</p>
            </div>
            <button id='buttonmodi' 
              className="modify-button" 
              onClick={() => handleModify(user.id)}
            >
              Modificar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
