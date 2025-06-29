import React, { useState } from "react";

const PagePaiement = ({ onOrder }) => {
  const [processing, setProcessing] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const idclient = localStorage.getItem('idclient');

  const handleOrder = async () => {
    if (!idclient) {
      alert('Vous devez être connecté pour commander.');
      return;
    }
    if (!cart.length) {
      alert('Votre panier est vide.');
      return;
    }
    setProcessing(true);
    try {
      const response = await fetch('http://localhost:3080/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idclient, cart })
      });
      if (response.ok) {
        alert('Commande passée avec succès !');
        localStorage.removeItem('cart');
        if (onOrder) onOrder(); // callback pour vider le panier côté parent
      }
    } catch (e) {
      alert('Erreur lors de la commande.');
    }
    setProcessing(false);
  };

  return (
    <button className="button" onClick={handleOrder} disabled={processing} style={{marginTop: 8, background: '#4e9cff'}}>
      {processing ? 'Traitement...' : 'Commander'}
    </button>
  );
};

export default PagePaiement;