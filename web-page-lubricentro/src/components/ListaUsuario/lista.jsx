// src/UserList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./lista.css";
import { setUsers } from "../../redux/actions/userActions";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    const initialUsers = [
      {
        id: 1,
        name: "Juan Perez",
        cedula: "123456789",
        email: "juan@example.com",
        rol: "Usuario",
      },
      {
        id: 2,
        name: "Maria Gomez",
        cedula: "987654321",
        email: "maria@example.com",
        rol: "Admin",
      },
      {
        id: 3,
        name: "Carlos Mendez",
        cedula: "456123789",
        email: "carlos@example.com",
        rol: "Mecanico",
      },
    ];
    dispatch(setUsers(initialUsers));
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
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
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-list-item">
            <span>
              {user.name} - {user.cedula}
            </span>
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
