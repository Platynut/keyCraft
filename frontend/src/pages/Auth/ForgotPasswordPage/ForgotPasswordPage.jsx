import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
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
	<>
	<Header />
	<div className='main-account'>
	  <div className="profile-box">
	  {message && <p>{message}</p>}
	  <h2>Mot de passe oublié</h2>
	  <form className="profile-form" onSubmit={handleSubmit}>
		
		<input 
		  className="inputbox"
		  type="email"
		  placeholder="Votre email"
		  value={email}
		  onChange={(e) => setEmail(e.target.value)}
		  required
		/><br />
		<button className="loginbutton" type="submit">Envoyer</button>
	  </form>
	  </div>
	</div>
	<Footer />
	</>
  );
}

export default ForgotPassword;
