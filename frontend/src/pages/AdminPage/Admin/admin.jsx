import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleToggleAdmin = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`http://localhost:3001/admin/users/${id}/toggle-admin`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erreur lors du changement de statut');
    setUsers(users =>
      users.map(u => u._id === id ? { ...u, isAdmin: !u.isAdmin } : u)
    );
  } catch (err) {
    setMessage(err.message || 'Erreur inconnue');
  }
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMessage('');
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        // N'OUBLIE PAS de régler selon le port de ton backend
        const [statsRes, usersRes] = await Promise.all([
          fetch('http://localhost:3001/admin/dashboard/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:3001/admin/users', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
        ]);

        if (!statsRes.ok || !usersRes.ok) {
          throw new Error('Erreur de chargement des données');
        }

        const statsData = await statsRes.json();
        const usersData = await usersRes.json();
        setStats(statsData.data);
        setUsers(usersData.data);
        setMessage('Données admin chargées avec succès');
      } catch (err) {
        setMessage(err.message || 'Erreur inconnue');
        // Si non autorisé, on redirige
        if (err.message.includes('401') || err.message.includes('403')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div className="form-container"><p>Chargement ...</p></div>;

  return (
    <div className="form-container">
      <h2>Dashboard Admin</h2>
      {message && (
        <div style={{ color: message.includes('succès') ? 'green' : 'red', marginBottom: 10 }}>
          {message}
        </div>
      )}
      {/* STATISTIQUES */}
      {stats &&
        <div style={{ marginBottom: 20 }}>
          <div>Utilisateurs : <b>{stats.totalUsers}</b></div>
          <div>Produits : <b>{stats.totalProducts}</b></div>
          <div>Commandes : <b>{stats.totalOrders}</b></div>
        </div>
      }
      {/* TABLE UTILISATEURS */}
      <h3>Utilisateurs inscrits</h3>
      {users && users.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: 10 }}>
          <thead>
            <tr>
              <th style={thStyle} >Email</th>
              <th style={thStyle} >Prénom</th>
              <th style={thStyle} >Nom</th>
              <th style={thStyle} >Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.firstName}</td>
                <td style={tdStyle}>{u.lastName}</td>
                <td style={tdStyle}>
    <button
      onClick={() => handleToggleAdmin(u._id)}
      style={{
        background: u.isAdmin ? '#ffd700' : '#efefef',
        padding: '4px 8px',
        borderRadius: 4,
        cursor: 'pointer',
        border: '1px solid #ddd'
      }}
    >
      {u.isAdmin ? 'Retirer admin' : 'Donner admin'}
    </button>
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Aucun utilisateur trouvé.</div>
      )}
    </div>
  );
}

// Réutilisation du style inline façon LoginPage simple
const thStyle = { border: '1px solid #ddd', padding: 8, background: '#f5f5f5', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: 8 };

export default AdminDashboard;
