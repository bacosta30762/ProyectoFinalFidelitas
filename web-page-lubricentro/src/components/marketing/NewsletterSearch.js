import React, { useState } from 'react';
import axios from 'axios';

function NewsletterSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/newsletters/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching newsletters:', error);
      alert('Error al buscar boletines: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Buscar Boletines Informativos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar boletines"
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewsletterSearch;
