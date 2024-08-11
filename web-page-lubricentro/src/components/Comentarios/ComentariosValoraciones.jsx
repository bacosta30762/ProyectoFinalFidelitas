import React, { useState } from "react";
import { FaStar, FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

const ComentariosValoraciones = () => {
 const [comentarios, setComentarios] = useState([
    { id: 1, texto: "Excelente servicio!", valoracion: 5 },
    { id: 2, texto: "Muy satisfecho con la compra.", valoracion: 4 },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState("");
  const [nuevaValoracion, setNuevaValoracion] = useState(0);
  const [comentarioEditado, setComentarioEditado] = useState(null);

  const agregarComentario = () => {
    if (nuevoComentario.trim() !== "") {
      if (comentarioEditado) {
        setComentarios(
          comentarios.map((comentario) =>
            comentario.id === comentarioEditado.id
              ? { ...comentario, texto: nuevoComentario, valoracion: nuevaValoracion }
              : comentario
          )
        );
        setComentarioEditado(null);
      } else {
        setComentarios([
          ...comentarios,
          { id: Date.now(), texto: nuevoComentario, valoracion: nuevaValoracion },
        ]);
      }
      setNuevoComentario("");
      setNuevaValoracion(0);
    }
  };

  const eliminarComentario = (id) => {
    setComentarios(comentarios.filter((comentario) => comentario.id !== id));
  };

  const editarComentario = (comentario) => {
    setNuevoComentario(comentario.texto);
    setNuevaValoracion(comentario.valoracion);
    setComentarioEditado(comentario);
  };

  const handleStarClick = (index) => {
    setNuevaValoracion(index + 1);
  };

  return (
    <div className="comentarios-container">
      <h1>Comentarios y Valoraciones</h1>
      <div className="comentario-form">
        <textarea
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe tu comentario"
        />
        <div className="valoracion-container">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`star ${index < nuevaValoracion ? "filled" : ""}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
        <button onClick={agregarComentario}>
          {comentarioEditado ? "Guardar Cambios" : "Agregar Comentario"}
        </button>
      </div>
      <div className="comentarios-lista">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario">
            <div className="comentario-header">
              <FaTrashAlt
                className="eliminar-icon"
                onClick={() => eliminarComentario(comentario.id)}
              />
              <FaEdit
                className="editar-icon"
                onClick={() => editarComentario(comentario)}
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
          </div>
        ))}
      </div>
    </div>
  );
};
export default ComentariosValoraciones;
