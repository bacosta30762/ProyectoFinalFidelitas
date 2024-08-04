import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionForm({ subscription, onFormSubmit }) {
  const [email, setEmail] = useState(subscription ? subscription.email : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email };
      const response = await axios.post('/api/subscriptions', data);
      alert('Suscripción creada/modificada con éxito!');
      onFormSubmit(response.data);
    } catch (error) {
      alert('Error al crear/modificar suscripción: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email para suscripción"
        required
      />
      <button type="submit">Suscribirse</button>
    </form>
  );
}

export default SubscriptionForm;
