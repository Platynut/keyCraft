import React, { useEffect, useState } from 'react';
 
export default function AdminKeyboards() {
  const [keyboards, setKeyboards] = useState([]);
  const [form, setForm] = useState({ name: '', marque: '', type: '', switches: '', layout: '', wireless: false, rgb: false, hot_swappable: false, price: '', stock: '' });
  const [editId, setEditId] = useState(null);

  const loadKeyboards = async () => {
    const res = await fetch('/admin/keyboards');
    setKeyboards(await res.json());
  };

  useEffect(() => { loadKeyboards(); }, []);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/admin/keyboards/${editId}` : '/admin/keyboards';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) })
    });
    if (res.ok) {
      setForm({ name: '', marque: '', type: '', switches: '', layout: '', wireless: false, rgb: false, hot_swappable: false, price: '', stock: '' });
      setEditId(null);
      loadKeyboards();
    }
  };

  const handleEdit = kb => {
    setForm(kb);
    setEditId(kb.id);
  };

  const handleDelete = async id => {
    if (window.confirm("Supprimer ?")) {
      await fetch(`/admin/keyboards/${id}`, { method: 'DELETE' });
      loadKeyboards();
    }
  };

  return (
    <div>
      <h2>Gestion des claviers</h2>
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
