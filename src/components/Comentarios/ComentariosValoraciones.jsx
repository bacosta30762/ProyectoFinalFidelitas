import React, { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_ROUTES } from "../../api";
import { getToken } from "../../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

const ComentariosValoraciones = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);

  const fetchComentarios = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_ROUTES.marketing}/ObtenerResenas`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las reseñas.");
      }

      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  };

  const crearComentario = async () => {
    if (nuevoTexto.trim() === "") return;

    try {
      const token = getToken();
      const payload = {
        id: 0,
        contenido: nuevoTexto,
        fechaCreacion: new Date().toISOString(),
        boletinId: 0, // Update this if boletinId is dynamic
        boletin: {
          id: 0,
          titulo: "Boletín relacionado",
          contenido: "Contenido relacionado",
          fechaEnvio: new Date().toISOString(),
          esPromocional: true,
        },
      };

      const response = await fetch(`${API_ROUTES.marketing}/CrearResena`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al crear la reseña.");
      }

      fetchComentarios();
      setNuevoTexto("");
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  const modificarComentario = async (id, nuevoContenido) => {
    try {
      const token = getToken();
      const comentario = comentarios.find((c) => c.id === id);

      if (!comentario) return;

      const payload = {
        ...comentario,
        contenido: nuevoContenido,
      };

      const response = await fetch(
        `${API_ROUTES.marketing}/ModificarResena/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error al modificar la reseña.");
      }

      fetchComentarios();
    } catch (error) {
      console.error("Error al modificar la reseña:", error);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${API_ROUTES.marketing}/EliminarResena/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la reseña.");
      }

      fetchComentarios();
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  const handleEditarComentario = (comentario) => {
    setNuevoTexto(comentario.contenido);
    setComentarioSeleccionado(comentario);
  };

  const handleGuardarComentario = () => {
    if (comentarioSeleccionado) {
      modificarComentario(comentarioSeleccionado.id, nuevoTexto);
      setComentarioSeleccionado(null);
      setNuevoTexto("");
    } else {
      crearComentario();
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  return (
    <div className="comentarios-container">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Comentarios y Valoraciones
      </h1>

      <div className="comentarios-lista">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario-card">
            <div className="comentario-header">
              <FaTrashAlt
                className="icon eliminar-icon"
                title="Eliminar"
                onClick={() => eliminarComentario(comentario.id)}
              />
              <FaEdit
                className="icon editar-icon"
                title="Editar"
                onClick={() => handleEditarComentario(comentario)}
              />
            </div>
            <p className="comentario-texto">{comentario.contenido}</p>
            <div className="valoracion-container">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`star ${
                    index < comentario.valoracion ? "filled" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="nuevo-comentario-form">
        <textarea
          className="comentario-textarea"
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          placeholder="Escribe tu comentario"
        />
        <button
          className="btn btn-primary"
          onClick={handleGuardarComentario}
          style={{ marginTop: "10px" }}
        >
          {comentarioSeleccionado ? "Guardar Cambios" : "Agregar Comentario"}
        </button>
      </div>
    </div>
  );
};

export default ComentariosValoraciones;
