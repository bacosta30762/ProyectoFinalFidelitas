import React, { useState } from 'react';
import axios from 'axios';

const TaskSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`/api/tasks?search=${query}`)
            .then(response => setResults(response.data))
            .catch(error => console.error('Error searching tasks:', error));
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar tarea"
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
};

export default TaskSearch;
