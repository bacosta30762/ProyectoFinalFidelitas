import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./modifica.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(id))
  );

  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    email: "",
    rol: [],
    activo: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user.nombre,
        apellidos: user.apellidos,
        cedula: user.cedula,
        email: user.email,
        rol: Array.isArray(user.rol) ? user.rol : [user.rol],
        activo: user.activo,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      cedula: userData.cedula,
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      correo: userData.email,
    };

    dispatch(updateUser(user.id, updatedUserData));
    alert("Información actualizada para el usuario: " + userData.nombre);
    navigate("/user-list");
  };

  const updateUser = (id, userData) => {
    return async (dispatch) => {
      try {
        const response = await fetch(
          `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/Actualizar/${userData.cedula}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          dispatch({
            type: "UPDATE_USER",
            payload: updatedUser,
          });
        } else {
          alert("Hubo un problema al actualizar el usuario.");
        }
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        alert("Error en la conexión con el servidor.");
      }
    };
  };

  const handleToggleActive = async () => {
    const confirmMessage = userData.activo
      ? `¿Estás seguro de que deseas desactivar al usuario ${userData.nombre}?`
      : `¿Estás seguro de que deseas activar al usuario ${userData.nombre}?`;

    if (window.confirm(confirmMessage)) {
      const url = `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/${
        userData.activo ? "Deseactivar" : "Activar"
      }?cedula=${userData.cedula}`;

      try {
        const response = await fetch(url, { method: "PUT" });

        if (response.ok) {
          alert(
            `Usuario ${
              userData.activo ? "desactivado" : "activado"
            } correctamente`
          );

          const updatedUser = { ...userData, activo: !userData.activo };
          setUserData(updatedUser);
          dispatch(updateUser(user.id, updatedUser));
        } else {
          alert("Hubo un problema al actualizar el usuario");
        }
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Error en la conexión con el servidor");
      }
    }
  };

  const handleAssignRole = async () => {
    const confirmMessage = `¿Estás seguro de que deseas asignar los roles [${userData.rol.join(", ")}] al usuario ${userData.nombre}?`;

    if (window.confirm(confirmMessage)) {
      const url = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/AsignarRol";
      const body = {
        Cedula: userData.cedula,
        RoleNames: userData.rol,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data.fueExitoso) {
          alert(`Roles [${userData.rol.join(", ")}] asignados correctamente a ${userData.nombre}`);
        } else {
          alert("Error al asignar roles: " + (data.errores?.join(", ") ?? ""));
        }
      } catch (error) {
        console.error("Error al asignar los roles:", error);
        alert("Error en la conexión con el servidor");
      }
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
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            className="edit-user-input"
          />
        </label>
        <label>
          Apellidos:
          <input
            type="text"
            name="apellidos"
            value={userData.apellidos}
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
          Roles:
          <select
            name="rol"
            multiple
            value={userData.rol}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
              setUserData({ ...userData, rol: selectedOptions });
            }}
            className="edit-user-input"
          >
            <option value="Admin">Admin</option>
            <option value="Mecanico">Mecanico</option>
            <option value="Contador">Contador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </label>
        <button type="button" onClick={handleAssignRole} className="assign-role-button">
          Asignar Rol
        </button>
        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>
      <button
        onClick={handleToggleActive}
        className={`delete-button ${userData.activo ? "desactivar" : "activar"}`}
      >
        {userData.activo ? "Desactivar Usuario" : "Activar Usuario"}
      </button>
    </div>
  );
};

export default EditUser;

