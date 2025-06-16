import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Email de réinitialisation envoyé. Vérifiez votre boîte mail.');
      } else {
        setMessage(data.message || 'Erreur lors de la demande.');
      }
    } catch (error) {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
