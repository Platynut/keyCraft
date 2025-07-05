import React, { useState } from 'react';
import Header from '../../../components/Header';
import '../../../styles/globals.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';

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
        localStorage.setItem('idclient', data.user._id);
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
    <div >
      <Header />
      <div className='main-account'>
        <div className="profile-box">
          <h2>Connexion à votre compte KeyCraft</h2>
          {message && <p>{message}</p>}
          <form className="profile-form" onSubmit={handleLogin}>
            <input
              className="inputbox"
              type="text"
              value={emailOrusername}
              placeholder="Email ou pseudo"
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              className="inputbox"
              type="password"
              value={password}
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className='mdp_oublie'>
            <Link className="mdp_oublie_texte" to="/forgot-password" >
              Mot de passe oublié ?
            </Link>
            </p>
            <div className='button-container'>
              <button className="loginbutton" type="submit">Connexion</button>
              <button className="loginbutton" type="button" onClick={handleRegister}>S'inscrire</button>
            </div>
          </form>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
