import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../api";
import { getToken } from "../services/authService";

const MarketingPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [showInformativeExample, setShowInformativeExample] = useState(false);
  const [showPromotionalExample, setShowPromotionalExample] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newIsPromotional, setNewIsPromotional] = useState(false);
  const [newDate, setNewDate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const NEWSLETTERS_PER_PAGE = 5;

  const fetchNewsletters = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_ROUTES.marketing}/ObtenerBoletines`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error fetching newsletters.");
      }

      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  const createNewsletter = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_ROUTES.marketing}/CrearBoletin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0,
          titulo: newTitle,
          contenido: newContent,
          fechaEnvio: newDate,
          esPromocional: newIsPromotional,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating newsletter.");
      }

      fetchNewsletters();
      setNewTitle("");
      setNewContent("");
      setNewDate("");
      setNewIsPromotional(false);
    } catch (error) {
      console.error("Error creating newsletter:", error);
    }
  };

  const updateNewsletter = async (id, updatedTitle) => {
    try {
      const token = getToken();
      const newsletterToUpdate = newsletters.find((n) => n.id === id);
      const response = await fetch(`${API_ROUTES.marketing}/ModificarBoletin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newsletterToUpdate,
          titulo: updatedTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating newsletter.");
      }

      fetchNewsletters();
      setEditingNewsletter(null);
      setNewTitle("");
    } catch (error) {
      console.error("Error updating newsletter:", error);
    }
  };

  const deleteNewsletter = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${API_ROUTES.marketing}/EliminarBoletin/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting newsletter.");
      }

      fetchNewsletters();
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const toggleInformativeExample = () => {
    setShowInformativeExample(!showInformativeExample);
  };

  const togglePromotionalExample = () => {
    setShowPromotionalExample(!showPromotionalExample);
  };

  const startEditing = (newsletter) => {
    setEditingNewsletter(newsletter.id);
    setNewTitle(newsletter.titulo);
  };

  const saveNewsletter = (id) => {
    updateNewsletter(id, newTitle);
  };

  // Pagination logic
  const totalPages = Math.ceil(newsletters.length / NEWSLETTERS_PER_PAGE);

  const currentNewsletters = newsletters.slice(
    (currentPage - 1) * NEWSLETTERS_PER_PAGE,
    currentPage * NEWSLETTERS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Marketing</h1>

      <h2 style={{ textAlign: "center" }}>Crear Nuevo Boletín</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Contenido"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={newIsPromotional}
              onChange={(e) => setNewIsPromotional(e.target.checked)}
            />
            Es Promocional
          </label>
        </div>
        <button onClick={createNewsletter}>Crear</button>
      </div>

      <h2 style={{ textAlign: "center" }}>Boletines Creados</h2>
      {currentNewsletters.length > 0 ? (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 3fr 2fr",
            gap: "10px",
          }}
        >
          {currentNewsletters.map((newsletter) => (
            <React.Fragment key={newsletter.id}>
              <div>
                {newsletter.esPromocional ? "Promocional" : "Informativo"}
              </div>
              <div>
                {editingNewsletter === newsletter.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  newsletter.titulo
                )}
              </div>
              <div>
                {editingNewsletter === newsletter.id ? (
                  <button onClick={() => saveNewsletter(newsletter.id)}>
                    Guardar
                  </button>
                ) : (
                  <button onClick={() => startEditing(newsletter)}>
                    Modificar
                  </button>
                )}
                <button
                  onClick={() => deleteNewsletter(newsletter.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Eliminar
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>No hay boletines creados.</div>
      )}

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="btn btn-secondary"
          >
            Anterior
          </button>
          <span style={{ margin: "0 10px" }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn btn-secondary"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketingPage;
