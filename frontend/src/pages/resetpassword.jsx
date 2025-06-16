import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Mot de passe réinitialisé avec succès. Vous allez être redirigé vers la connexion.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(data.message || 'Erreur lors de la réinitialisation.');
      }
    } catch (error) {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Réinitialiser</button>
      </form>
    </div>
  );
}

export default ResetPassword;
