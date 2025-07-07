import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminKeycaps() {
  const navigate = useNavigate();
  const [keycaps, setKeycaps] = useState([]);
  const [form, setForm] = useState({ name: '', profile: '', material: '', layout: '', colorway: '', shine_through: false, price: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const loadKeycaps = async () => {
    const res = await fetch('http://localhost:3080/keycaps');
    setKeycaps(await res.json());
  };

  useEffect(() => { loadKeycaps(); }, []);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PATCH' : 'POST';
    const url = editId ? `http://localhost:3080/keycaps/${editId}` : 'http://localhost:3080/keycaps';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) })
    });
    if (res.ok) {
      setForm({ name: '', profile: '', material: '', layout: '', colorway: '', shine_through: false, price: '', stock: '' });
      setEditId(null);
      setMessage(editId ? 'Keycaps modifié avec succès.' : 'Keycaps ajouté avec succès.');
      loadKeycaps();
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('Erreur lors de l\'enregistrement.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleEdit = kc => {
    setForm(kc);
    setEditId(kc.id);
  };

  const handleDelete = async id => {
    if (window.confirm("Supprimer ?")) {
      const res = await fetch(`http://localhost:3080/keycaps/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Keycaps supprimé avec succès.');
        loadKeycaps();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Erreur lors de la suppression.');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  return (
    <div>
      <h2>Gestion des keycaps</h2>
      {message && <div style={{marginBottom: 12, color: message.includes('succès') ? 'green' : 'red'}}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
        <input name="profile" placeholder="Profil" value={form.profile} onChange={handleChange} />
        <input name="material" placeholder="Matériau" value={form.material} onChange={handleChange} />
        <input name="layout" placeholder="Layout" value={form.layout} onChange={handleChange} />
        <input name="colorway" placeholder="Colorway" value={form.colorway} onChange={handleChange} />
        <label><input type="checkbox" name="shine_through" checked={form.shine_through} onChange={handleChange} />Shine through</label>
        <input name="price" placeholder="Prix" type="number" step="0.01" value={form.price} onChange={handleChange} />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
        <button type="submit">{editId ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <table>
        <thead>
          <tr><th>Nom</th><th>Profil</th><th>Matériau</th><th>Layout</th><th>Colorway</th><th>Shine</th><th>Prix</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {keycaps.map(kc => (
            <tr key={kc.id}>
              <td>{kc.name}</td>
              <td>{kc.profile}</td>
              <td>{kc.material}</td>
              <td>{kc.layout}</td>
              <td>{kc.colorway}</td>
              <td>{kc.shine_through ? 'Oui' : 'Non'}</td>
              <td>{kc.price}</td>
              <td>{kc.stock}</td>
              <td>
                <button onClick={() => handleEdit(kc)}>✏️</button>
                <button onClick={() => handleDelete(kc.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='management-button' onClick={() => navigate('/admin')}>
        Retour au dashboard admin
      </button>
    </div>
  );
}
