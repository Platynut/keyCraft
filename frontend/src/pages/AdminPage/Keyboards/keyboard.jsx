import React, { useEffect, useState } from 'react';

export default function AdminKeyboards() {
  const [keyboards, setKeyboards] = useState([]);
  const [form, setForm] = useState({ name: '', marque: '', type: '', switches: '', layout: '', wireless: false, rgb: false, hot_swappable: false, price: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const loadKeyboards = async () => {
    const res = await fetch('http://localhost:3080/keyboard');
    setKeyboards(await res.json());
  };

  useEffect(() => { loadKeyboards(); }, []);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PATCH' : 'POST';
    const url = editId ? `http://localhost:3080/keyboard/${editId}` : 'http://localhost:3080/keyboard';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) })
    });
    if (res.ok) {
      setForm({ name: '', marque: '', type: '', switches: '', layout: '', wireless: false, rgb: false, hot_swappable: false, price: '', stock: '' });
      setEditId(null);
      setMessage(editId ? 'Clavier modifié avec succès.' : 'Clavier ajouté avec succès.');
      loadKeyboards();
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('Erreur lors de l\'enregistrement.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleEdit = kb => {
    setForm(kb);
    setEditId(kb.id);
  };

  const handleDelete = async id => {
    if (window.confirm("Supprimer ?")) {
      const res = await fetch(`http://localhost:3080/keyboard/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Clavier supprimé avec succès.');
        loadKeyboards();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Erreur lors de la suppression.');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  return (
    <div>
      <h2>Gestion des claviers</h2>
      {message && <div style={{marginBottom: 12, color: message.includes('succès') ? 'green' : 'red'}}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
        <input name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
        <input name="switches" placeholder="Switches" value={form.switches} onChange={handleChange} />
        <input name="layout" placeholder="Layout" value={form.layout} onChange={handleChange} />
        <label><input type="checkbox" name="wireless" checked={form.wireless} onChange={handleChange} />Wireless</label>
        <label><input type="checkbox" name="rgb" checked={form.rgb} onChange={handleChange} />RGB</label>
        <label><input type="checkbox" name="hot_swappable" checked={form.hot_swappable} onChange={handleChange} />Hot swappable</label>
        <input name="price" placeholder="Prix" type="number" step="0.01" value={form.price} onChange={handleChange} />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
        <button type="submit">{editId ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <table>
        <thead>
          <tr><th>Nom</th><th>Marque</th><th>Type</th><th>Switches</th><th>Layout</th><th>Wireless</th><th>RGB</th><th>HotSwap</th><th>Prix</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {keyboards.map(kb => (
            <tr key={kb.id}>
              <td>{kb.name}</td>
              <td>{kb.marque}</td>
              <td>{kb.type}</td>
              <td>{kb.switches}</td>
              <td>{kb.layout}</td>
              <td>{kb.wireless ? 'Oui' : 'Non'}</td>
              <td>{kb.rgb ? 'Oui' : 'Non'}</td>
              <td>{kb.hot_swappable ? 'Oui' : 'Non'}</td>
              <td>{kb.price}</td>
              <td>{kb.stock}</td>
              <td>
                <button onClick={() => handleEdit(kb)}>✏️</button>
                <button onClick={() => handleDelete(kb.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
