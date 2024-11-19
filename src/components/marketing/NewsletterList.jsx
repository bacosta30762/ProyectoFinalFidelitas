import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewsletterList() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios.get('/api/newsletters')
      .then(response => setNewsletters(response.data))
      .catch(error => console.error('Error fetching newsletters:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Boletines Informativos</h1>
      <ul>
        {newsletters.map(newsletter => (
          <li key={newsletter.id}>
            <Link to={`/marketing/newsletters/${newsletter.id}`}>{newsletter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsletterList;
