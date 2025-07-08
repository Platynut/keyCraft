import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import './css/KeyboardDetail.css';

function KeycapDetail() {
  const { id } = useParams();
  const [keycap, setKeycap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3080/keycaps/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setKeycap(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement du keycap');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === keycap._id || item.id === keycap.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: keycap._id || keycap.id,
        name: keycap.name,
        price: keycap.price,
        url: keycap.url,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!keycap) return <p>Keycap introuvable</p>;

  return (
    <>
      <Header />
      <div className="keyboard-detail-container">
        <div className="keyboard-detail-imgbox">
          <img src={keycap.url} alt={keycap.name} className="keyboard-detail-img" />
          <div className="keyboard-detail-description-block">
            <h3>Description</h3>
            <p className="keyboard-detail-description">{keycap.description || 'Aucune description.'}</p>
          </div>
        </div>
        <div className="keyboard-detail-info">
          <h2 className="keyboard-detail-title">{keycap.name}</h2>
          <div className="keyboard-detail-price">{keycap.price} €</div>
          <div className="keyboard-detail-rating">Note : <span>{keycap.rating} / 5</span></div>
          <button 
            className="keyboard-detail-addcart" 
            onClick={handleAddToCart} 
            disabled={keycap.stock === 0 || added}
          >
            {added ? "Ajouté !" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </>
  );
}

export default KeycapDetail;
