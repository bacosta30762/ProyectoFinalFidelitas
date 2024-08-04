import React, { useState } from 'react';
import axios from 'axios';

function NewsletterForm({ newsletter, onFormSubmit }) {
  const [title, setTitle] = useState(newsletter ? newsletter.title : '');
  const [content, setContent] = useState(newsletter ? newsletter.content : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, content };
      const response = await axios.post('/api/newsletters', data);
      alert('Boletín creado/modificado con éxito!');
      onFormSubmit(response.data);
    } catch (error) {
      alert('Error al crear/modificar boletín: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título del Boletín"
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Contenido del Boletín"
        required
      />
      <button type="submit">Guardar Boletín</button>
    </form>
  );
}

export default NewsletterForm;
