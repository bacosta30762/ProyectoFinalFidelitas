import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lista.css';

const UserList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Perez', cedula: '123456789', email: 'juan@example.com', rol: 'Usuario' },
    { id: 2, name: 'Maria Gomez', cedula: '987654321', email: 'maria@example.com', rol: 'Admin' },
    { id: 3, name: 'Carlos Mendez', cedula: '456123789', email: 'carlos@example.com', rol: 'Mecanico' },
    // Agrega más usuarios aquí
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula.includes(searchTerm)
  );

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Lista de Usuarios</h2>
      
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id} className="user-list-item">
            <span>{user.name} - {user.cedula}</span>
            <button 
              onClick={() => navigate(`/edit-user/${user.id}`)} 
              className="edit-button"
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
