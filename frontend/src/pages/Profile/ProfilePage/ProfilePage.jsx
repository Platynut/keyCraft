import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import styles from './ProfilePage.module.css';
import '../../../styles/globals.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

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

  // Récupère les commandes de l'utilisateur connecté
  useEffect(() => {
    const idclient = localStorage.getItem('idclient');
    if (!idclient) return;
    fetch('http://localhost:3080/order')
      .then(res => res.json())
      .then(data => {
        const userOrders = data.filter(order => order.idclient === idclient);
        setOrders(userOrders);
      })
      .catch(() => setOrders([]));
  }, []);

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

  // Annulation d'une commande
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Voulez-vous vraiment annuler cette commande ?')) return;
    try {
      const res = await fetch(`http://localhost:3080/order/${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders => orders.filter(order => order.id !== orderId));
      } else {
        alert('Erreur lors de l\'annulation.');
      }
    } catch (e) {
      alert('Erreur lors de l\'annulation.');
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
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
      <div className={styles.ordersContainer}>
        <h2>Mes commandes</h2>
        {orders.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <ul style={{paddingLeft: 0}}>
            {orders.map(order => (
              <li key={order.id} className={styles.orderItem}>
                <div className={styles.orderHeader}>
                  <span><b>Commande n°{order.id}</b> - {new Date(order.date).toLocaleDateString()} - <span className={styles.orderStatus}>{order.status}</span></span>
                  <button className={styles.cancelButton} onClick={() => handleCancelOrder(order.id)}>Annuler</button>
                </div>
                <ul className={styles.orderItemsList}>
                  {(order.cart || order.items || []).map((item, idx) => (
                    <li key={idx}>{item.name} x{item.quantity} - {item.price}€</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Profile;
