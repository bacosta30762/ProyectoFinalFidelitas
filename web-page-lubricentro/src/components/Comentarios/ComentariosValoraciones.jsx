import React, { useState } from "react";
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

const ComentariosValoraciones = () => {
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      texto: "Excelente servicio!",
      valoracion: 5,
      respuestas: [],
    },
    {
      id: 2,
      texto: "Muy satisfecho con la compra.",
      valoracion: 4,
      respuestas: [],
    },
  ]);

  const [nuevoTexto, setNuevoTexto] = useState("");
  const [respuestaTexto, setRespuestaTexto] = useState("");
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
  const [respuestaEditando, setRespuestaEditando] = useState(null);
  const [esRespuesta, setEsRespuesta] = useState(false);

  const handleAgregarComentario = () => {
    if (nuevoTexto.trim() !== "") {
      if (comentarioSeleccionado) {
        setComentarios(
          comentarios.map((comentario) =>
            comentario.id === comentarioSeleccionado.id
              ? { ...comentario, texto: nuevoTexto }
              : comentario
          )
        );
        setComentarioSeleccionado(null);
      } else {
        setComentarios([
          ...comentarios,
          {
            id: Date.now(),
            texto: nuevoTexto,
            valoracion: 0,
            respuestas: [],
          },
        ]);
      }
      setNuevoTexto("");
    }
  };

  const handleEliminarComentario = (id) => {
    setComentarios(comentarios.filter((comentario) => comentario.id !== id));
  };

  const handleEditarComentario = (comentario) => {
    setNuevoTexto(comentario.texto);
    setComentarioSeleccionado(comentario);
    setEsRespuesta(false);
  };

  const handleResponderComentario = (comentario) => {
    setComentarioSeleccionado(comentario);
    setRespuestaTexto("");
    setEsRespuesta(true);
  };

  const handleAgregarRespuesta = () => {
    if (respuestaTexto.trim() !== "") {
      const comentarioActualizado = comentarios.map((comentario) =>
        comentario.id === comentarioSeleccionado.id
          ? {
              ...comentario,
              respuestas: [...comentario.respuestas, { id: Date.now(), texto: respuestaTexto }],
            }
          : comentario
      );
      setComentarios(comentarioActualizado);
      setComentarioSeleccionado(null);
      setRespuestaTexto("");
    }
  };

  const handleEditarRespuesta = (comentarioId, respuestaId) => {
    const comentario = comentarios.find((c) => c.id === comentarioId);
    const respuesta = comentario.respuestas.find((r) => r.id === respuestaId);
    setRespuestaTexto(respuesta.texto);
    setRespuestaEditando(respuesta);
    setComentarioSeleccionado(comentario);
    setEsRespuesta(true);
  };

  const handleGuardarRespuesta = () => {
    const comentarioActualizado = comentarios.map((comentario) =>
      comentario.id === comentarioSeleccionado.id
        ? {
            ...comentario,
            respuestas: comentario.respuestas.map((respuesta) =>
              respuesta.id === respuestaEditando.id
                ? { ...respuesta, texto: respuestaTexto }
                : respuesta
            ),
          }
        : comentario
    );
    setComentarios(comentarioActualizado);
    setRespuestaEditando(null);
    setComentarioSeleccionado(null);
    setRespuestaTexto("");
  };

  const handleEliminarRespuesta = (comentarioId, respuestaId) => {
    const comentarioActualizado = comentarios.map((comentario) =>
      comentario.id === comentarioId
        ? {
            ...comentario,
            respuestas: comentario.respuestas.filter((r) => r.id !== respuestaId),
          }
        : comentario
    );
    setComentarios(comentarioActualizado);
  };

  return (
    <div className="comentarios-container">
      <h1>Comentarios y Valoraciones</h1>
      <div className="comentarios-lista">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario">
            <div className="comentario-header">
              <FaTrashAlt
                className="eliminar-icon"
                onClick={() => handleEliminarComentario(comentario.id)}
              />
              <FaEdit
                className="editar-icon"
                onClick={() => handleEditarComentario(comentario)}
              />
            </div>
            <p>{comentario.texto}</p>
            <div className="valoracion-container">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`star ${index < comentario.valoracion ? "filled" : ""}`}
                />
              ))}
            </div>
            <button
              className="btn btn-link responder-button"
              onClick={() => handleResponderComentario(comentario)}
            >
              Responder
            </button>
            <div className="respuestas-container">
              {comentario.respuestas.map((respuesta) => (
                <div key={respuesta.id} className="respuesta">
                  <div className="comentario-header">
                    <FaTrashAlt
                      className="eliminar-icon"
                      onClick={() =>
                        handleEliminarRespuesta(comentario.id, respuesta.id)
                      }
                    />
                    <FaEdit
                      className="editar-icon"
                      onClick={() =>
                        handleEditarRespuesta(comentario.id, respuesta.id)
                      }
                    />
                  </div>
                  <p>{respuesta.texto}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {comentarioSeleccionado && esRespuesta && (
        <div className="respuesta-form">
          <textarea
            value={respuestaTexto}
            onChange={(e) => setRespuestaTexto(e.target.value)}
            placeholder="Escribe tu respuesta"
          />
          {respuestaEditando ? (
            <button onClick={handleGuardarRespuesta}>Guardar Cambios</button>
          ) : (
            <button onClick={handleAgregarRespuesta}>Agregar Respuesta</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentariosValoraciones;
