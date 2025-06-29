import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import './css/KeyboardDetail.css';

function KeyboardDetail() {
  const { id } = useParams();
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3080/keyboard/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setKeyboard(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement du clavier');
        setLoading(false);
      });
  }, [id]);

  // Récupère l'id client depuis le localStorage
  const idclient = localStorage.getItem('idclient');

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === keyboard._id || item.id === keyboard.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: keyboard._id || keyboard.id,
        name: keyboard.name,
        price: keyboard.price,
        url: keyboard.url,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!keyboard) return <p>Clavier introuvable</p>;

  return (
    <>
      <Header />
      <div className="keyboard-detail-container">
        <div className="keyboard-detail-imgbox">
          <img src={keyboard.url} alt={keyboard.name} className="keyboard-detail-img" />
          <div className="keyboard-detail-description-block">
            <h3>Description</h3>
            <p className="keyboard-detail-description">{keyboard.description || 'Aucune description.'}</p>
          </div>
        </div>
        <div className="keyboard-detail-info">
          <h2 className="keyboard-detail-title">{keyboard.name}</h2>
          <div className="keyboard-detail-price">{keyboard.price} €</div>
          <div className="keyboard-detail-rating">Note : <span>{keyboard.rating} / 5</span></div>
          {keyboard.stock > 0 && keyboard.stock < 10 && (
            <div className="keyboard-detail-lowstock">Il ne reste plus que {keyboard.stock} exemplaire{keyboard.stock > 1 ? 's' : ''} !</div>
          )}
          <button 
            className="keyboard-detail-addcart" 
            onClick={handleAddToCart} 
            disabled={keyboard.stock === 0 || added}
          >
            {added ? "Ajouté !" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </>
  );
}

export default KeyboardDetail;
