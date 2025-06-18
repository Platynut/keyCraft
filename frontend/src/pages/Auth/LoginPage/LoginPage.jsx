import React, { useState } from 'react';
import '../Style.css'; 
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Connexion réussie');
        onLogin(); // appelle la fonction passée en prop
      } else {
        setMessage(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur réseau');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Connexion</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        <Link to="/forgot-password" style={{ color: '#66ccff', textDecoration: 'underline' }}>
          Mot de passe oublié ?
        </Link>
        </p>
    </div>
  );
}

export default Login;
