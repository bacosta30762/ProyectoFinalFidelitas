import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaStar } from "react-icons/fa"; // Cambiado FaReply por FaEdit
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

const AdminComentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);

  useEffect(() => {
    cargarTodosLosComentarios();
  }, []);

  const cargarTodosLosComentarios = async () => {
    try {
      const response = await fetch(`https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Comentarios/obtenercomentarios`);
      if (response.ok) {
        const data = await response.json();
        console.log("Comentarios cargados:", data); // Agregado para depuración
        setComentarios(data);
      } else {
        console.error("Error al cargar comentarios");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      const response = await fetch(
        `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Comentarios/eliminar/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        cargarTodosLosComentarios();
      } else {
        console.error("Error al eliminar el comentario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  const responderComentario = async () => {
    if (!respuesta.trim()) {
      alert("La respuesta no puede estar vacía.");
      return;
    }

    try {
      const response = await fetch(
        `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Comentarios/responder/${comentarioSeleccionado.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comentarioId: comentarioSeleccionado.id, respuesta }),
        }
      );

      if (response.ok) {
        cargarTodosLosComentarios();
        setRespuesta("");
        setComentarioSeleccionado(null);
      } else {
        console.error("Error al responder el comentario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  const renderEstrellas = (puntuacion) => {
    return (
      <div className="valoracion-container">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`star ${index < puntuacion ? "filled" : ""}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="comentarios-container">
      <h1>Administrar Comentarios</h1>
      <div className="comentarios-lista">
        {comentarios.length === 0 ? (
          <p>No hay comentarios disponibles.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.id} className="comentario-card">
              <p><strong>Usuario:</strong> {comentario.nombreUsuario || "Anónimo"}</p>
              <p>{comentario.texto}</p>
              <p><strong>Fecha:</strong> {new Date(comentario.fechaCreacion).toLocaleDateString()}</p>
              {comentario.puntuacion && renderEstrellas(comentario.puntuacion)} {/* Aquí agregamos la valoración */}
              {comentario.respuesta && (
                <p><strong>Respuesta:</strong> {comentario.respuesta}</p>
              )}
              <div className="comentario-header">
                <FaTrashAlt
                  className="icon"
                  onClick={() => eliminarComentario(comentario.id)}
                />
                <FaEdit  // Aquí cambiamos el ícono a FaEdit (editar)
                  className="responder-icon"
                  onClick={() => setComentarioSeleccionado(comentario)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {comentarioSeleccionado && (
        <div className="comentario-form">
          <h3>Responder comentario</h3>
          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe tu respuesta"
            className="comentario-textarea"
          />
          <button onClick={responderComentario} className="btn btn-success">Enviar Respuesta</button>
        </div>
      )}
    </div>
  );
};

export default AdminComentarios;

