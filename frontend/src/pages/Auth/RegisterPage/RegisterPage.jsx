import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		street: '',
		number: '',
		line2: '',
		city: '',
		postalCode: '',
	});

	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const dataToSend = {
			username: formData.username,
			email: formData.email,
			password: formData.password,
			firstName: formData.firstName,
			lastName: formData.lastName,
			address: {
				street: formData.street,
				number: parseInt(formData.number, 10),
				line2: formData.line2,
				city: formData.city,
				postalCode: formData.postalCode,
			},
		};

		try {
			const res = await fetch('/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			});

			const result = await res.json();

			if (res.ok) {
				setMessage(result.message || 'Inscription réussie !');
				setTimeout(() => {
					window.location.href = '/login';
				}, 1500);
			} else {
				setMessage(result.message || 'Erreur lors de l’inscription.');
			}
		} catch (err) {
			console.error(err);
			setMessage('Erreur lors de l’inscription.');
		}
	};

	return (
		<div>
			<Header/>
			<div className='main-account'>
				<div className="profile-box">
					<h2>Créer un compte</h2>
					<form className="profile-form" onSubmit={handleSubmit}>
						<input className="inputbox" type="text" name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} required />
						<input className="inputbox" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
						<input className="inputbox" type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
						<input className="inputbox" type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required />
						<input className="inputbox" type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
						<input className="inputbox" type="text" name="number" placeholder="Numéro de téléphone" value={formData.number} onChange={handleChange} required />
						<input className="inputbox" type="text" name="street" placeholder="Rue" value={formData.street} onChange={handleChange} required />
						<input className="inputbox" type="text" name="line2" placeholder="Complément d'adresse (optionnel)" value={formData.line2} onChange={handleChange} />
						<input className="inputbox" type="text" name="postalCode" placeholder="Code postal" value={formData.postalCode} onChange={handleChange} required />
						<input className="inputbox" type="text" name="city" placeholder="Ville" value={formData.city} onChange={handleChange} required />
						<button className="loginbutton" type="submit">S’inscrire</button>
					</form>
					<p>{message}</p>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Register;
