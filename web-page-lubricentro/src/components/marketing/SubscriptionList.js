import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('/api/subscriptions')
      .then(response => setSubscriptions(response.data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Suscripciones</h1>
      <ul>
        {subscriptions.map(subscription => (
          <li key={subscription.id}>{subscription.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionList;
