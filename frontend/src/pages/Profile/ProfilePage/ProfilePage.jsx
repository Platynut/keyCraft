import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/globals.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    number: '',
    line2: '',
    city: '',
    postalCode: '',
  });

  // Vérifie le token et charge les données utilisateur
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3001/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Token invalide.') {
          navigate('/login');
        } else {
          setUser(data);
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.address.street,
            number: data.address.number,
            line2: data.address.line2 || '',
            city: data.address.city,
            postalCode: data.address.postalCode,
          });
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  // Mise à jour des champs
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mise à jour du profil
  const handleUpdate = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: {
        street: formData.street,
        number: parseInt(formData.number),
        line2: formData.line2,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    };

    try {
      const res = await fetch('http://localhost:3001/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Profil mis à jour !');
        setUser(result.user);
      } else {
        setMessage(result.message || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur');
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

    const ResetPassword = () => {
    navigate('/forgot-password');
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="form-container">
      <h1>Mon profil</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Prénom" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nom" required />
        <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Rue" required />
        <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="Numéro" required />
        <input type="text" name="line2" value={formData.line2} onChange={handleChange} placeholder="complément d'adresse (optionnel)" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ville" required />
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Code Postal" required />
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={handleLogout}>Déconnexion</button>
        <button type="button" onClick={ResetPassword}>Modifier Mot de Passe</button>
      </form>
    </div>
  );
}

export default Profile;
