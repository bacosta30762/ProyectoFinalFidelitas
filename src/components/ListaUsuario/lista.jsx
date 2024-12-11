import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./lista.css";
import { setUsers } from "../../redux/actions/userActions";
import apiClient from "../../apiClient";
import { API_ROUTES } from "../../api";

const ITEMS_PER_PAGE = 5;

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get(
          `${API_ROUTES.users}/lista-usuarios`
        );
        const userData = response.data.map((user, index) => ({
          id: index + 1,
          name: `${user.nombre} ${user.apellidos}`,
          cedula: user.cedula,
          email: user.email,
          rol: user.activo ? "Activo" : "Inactivo",
        }));
        dispatch(setUsers(userData));
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
        setError("No se pudo cargar la lista de usuarios.");
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cedula.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Lista de Usuarios</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="user-list">
        <div className="user-list-header">
          <span>Nombre</span>
          <span>Cédula</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Acciones</span>
        </div>
        {paginatedUsers.map((user) => (
          <div key={user.id} className="user-list-row">
            <span>{user.name}</span>
            <span>{user.cedula}</span>
            <span>{user.email}</span>
            <span>{user.rol}</span>
            <button
              onClick={() => navigate(`/edit-user/${user.id}`)}
              className="edit-button"
            >
              Modificar
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
