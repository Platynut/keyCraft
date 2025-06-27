import React, { useState } from 'react';
import '../../../styles/globals.css';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [emailOrusername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrusername, password }),
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

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <h2>Connexion</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={emailOrusername}
          placeholder="Email ou pseudo"
          onChange={(e) => setEmailOrUsername(e.target.value)}
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
        <button type="button" onClick={handleRegister}>S'inscrire</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        <Link to="/forgot-password" className={styles.link}>
          Mot de passe oublié ?
        </Link>
      </p>
    </div>
  );
}

export default Login;
