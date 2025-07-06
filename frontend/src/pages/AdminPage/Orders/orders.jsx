import React, { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  const loadOrders = async () => {
    const res = await fetch('http://localhost:3080/order');
    setOrders(await res.json());
  };

  useEffect(() => { loadOrders(); }, []);

  const handleDelete = async id => {
    if (window.confirm("Supprimer cette commande ?")) {
      const res = await fetch(`http://localhost:3080/order/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Commande supprimée avec succès.');
        loadOrders();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Erreur lors de la suppression.');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`http://localhost:3080/order/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      setMessage('Statut modifié avec succès.');
      loadOrders();
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('Erreur lors de la modification du statut.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div>
      <h2>Gestion des commandes</h2>
      {message && <div style={{marginBottom: 12, color: message.includes('succès') ? 'green' : 'red'}}>{message}</div>}
      <table>
        <thead>
          <tr><th>ID</th><th>Client</th><th>Date</th><th>Status</th><th>Produits</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.idclient}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>
                <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)}>
                  <option value="en attente">en attente</option>
                  <option value="en cours">en cours</option>
                  <option value="expédiée">expédiée</option>
                  <option value="livrée">livrée</option>
                  <option value="annulée">annulée</option>
                </select>
              </td>
              <td>
                <ul style={{margin:0, paddingLeft:16}}>
                  {(order.cart || []).map((item, idx) => (
                    <li key={idx}>{item.name} x{item.quantity} ({item.price}€)</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDelete(order.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
