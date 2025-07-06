import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import PagePaiement from "./Page_paiement";
import Login from "../pages/Auth/LoginPage/LoginPage.jsx"
import './css/PopUps.css';

const FenetrePanier = ({ bouton }) => {
    const [showpopup, setshowpopup] = useState(false);
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        if (showpopup) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(storedCart);
            setSubtotal(storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
            // Redirige vers la page de connexion si pas d'idclient
            const idclient = localStorage.getItem('idclient');
            if (!idclient) {
                window.location.href = '/Login';
            }
        }
    }, [showpopup]);

    useEffect(() => {
        const onStorage = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(storedCart);
            setSubtotal(storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const togglepopup = () => {
        setshowpopup(!showpopup);
    };

    const handlePaiement = async () => {
        const idclient = localStorage.getItem('idclient');
        if (!idclient) {
            window.location.href = '/Login';
            return;
        }
        try {
            const response = await fetch('http://localhost:3080/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idclient, cart })
            });
            if (response.ok) {
                window.location.href = '/Page_paiement';
            } else {
                alert('Erreur lors de la commande.');
            }
        } catch (e) {
            alert('Erreur lors de la commande.');
        }
    };

    const handleGoToPaiement = () => {
        const idclient = localStorage.getItem('idclient');
        if (!idclient) {
            window.location.href = '/Login';
        } else {
            window.location.href = '/Page_paiement';
        }
    };

    return (
        <div>
            <img onClick={togglepopup} src={bouton} />
            {showpopup &&
                ReactDOM.createPortal(
                    <div className="panier_container" onClick={togglepopup}>
                        <div className="panier" onClick={(e) => e.stopPropagation()}>
                            <div className="panier_head">
                                <img src="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png" />
                                <div className="">Mon Panier</div>
                                <img className="cross" onClick={togglepopup} src="https://img.icons8.com/?size=50&id=VaHFapP3XCAj&format=png&color=ffffff" />
                            </div>
                            <div className="panier_content_box">
                                <div>
                                    {cart.length === 0 ? (
                                        <div className="panier_content">Votre panier est vide.</div>
                                    ) : (
                                        cart.map((item, idx) => (
                                            <div className="panier_content" key={item.id}>
                                                <img className="miniature_panier" src={item.url} alt={item.name} />
                                                <div className="description">
                                                    {item.name} <br />
                                                    Qté : <br />
                                                    <div className="panier_qte_group">
                                                        <button className="panier_qte_btn" onClick={() => {
                                                            const newCart = cart.map((it, i) => i === idx ? { ...it, quantity: it.quantity - 1 } : it)
                                                                .filter(it => it.quantity > 0);
                                                            setCart(newCart);
                                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                                            setSubtotal(newCart.reduce((sum, it) => sum + it.price * it.quantity, 0));
                                                        }}>-</button>
                                                        <span style={{margin: '0 8px'}}>{item.quantity}</span>
                                                        <button className="panier_qte_btn" onClick={() => {
                                                            const currentStock = item.stock ?? 99;
                                                            if (item.quantity < currentStock) {
                                                                const newCart = cart.map((it, i) => i === idx ? { ...it, quantity: it.quantity + 1 } : it);
                                                                setCart(newCart);
                                                                localStorage.setItem('cart', JSON.stringify(newCart));
                                                                setSubtotal(newCart.reduce((sum, it) => sum + it.price * it.quantity, 0));
                                                            }
                                                        }} disabled={item.quantity >= (item.stock ?? 99)}>+</button>
                                                    </div>
                                                    {item.price}€
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="panier_info">
                                    <div className="panier_total">
                                        <div className="sous_total"><div>Sous-total</div><div>{subtotal.toFixed(2)}€</div></div>
                                    </div>
                                    <hr />
                                    <div className="panier_button">
                                        <button className="btn_commander" onClick={handleGoToPaiement}>
                                            Aller au paiement
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}
const Searchbar = ({bouton}) => {
    const [showpopupsearch, setshowpopup] = useState(false);

    const togglepopup = () => {
        setshowpopup(!showpopupsearch);
    };

    return (
        <div>
            
            <img className="bouton_recherche" onClick={togglepopup} src={bouton}/>
            {showpopupsearch && 
                ReactDOM.createPortal(
                    <div className="searchbar">
                        <input className="input_searchbar" placeholder="Rechercher un produit"/>
                    </div>,
                    document.body
                )}
        </div>
        
    );
}
const Clavier = ({bouton}) => {
    const [showpopupclavier, setshowpopup] = useState(false);
    const navigate = (typeof window !== 'undefined' && window.location) ? (url) => window.location.href = url : () => {};

    const handleGoToKeyboards = () => {
        navigate('/keyboards');
    };

    return (
        <div>
            
            <div className="bouton_header" onClick={handleGoToKeyboards}>{bouton}</div>
        </div>
        
    );
}
const Communauté = ({bouton}) => {
    const [showpopupcommunauté, setshowpopup] = useState(false);

    const togglepopupcommunauté = () => {
        setshowpopup(!showpopupcommunauté);
    };

    return (
        <div>
            
            <div className="bouton_header" onClick={togglepopupcommunauté}>{bouton}</div>
            {showpopupcommunauté && 
                ReactDOM.createPortal(
                    <div className="bandeau_container" onClick={togglepopupcommunauté}>
                        <div className="" onClick={(e) => e.stopPropagation()}>
                            <div>
                                <div className="bandeau">
                                    <div className="bandeau_titre"> <h4>Meilleurs concepts</h4>
                                        <div>clavier 1</div>
                                        <div>clavier 2</div>
                                        <div>clavier 3</div>
                                    </div>
                                    <div className="bandeau_titre"> <h4>Jeux concours</h4>
                                        <div>Participer</div>
                                        <div>Voter</div>
                                        <div>Règles</div>
                                        
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>,
                    document.body
                )}
        </div>
        
    );
}
const Support = ({bouton}) => {
    const [showpopupsupport, setshowpopup] = useState(false);

    const togglepopupsupport = () => {
        setshowpopup(!showpopupsupport);
    };

    return (
        <div>
            
            <div className="bouton_header" onClick={togglepopupsupport}>{bouton}</div>
            {showpopupsupport && 
                ReactDOM.createPortal(
                    <div className="bandeau_container" onClick={togglepopupsupport}>
                        <div className="clavier" onClick={(e) => e.stopPropagation()}>
                            <div>
                                <div className="bandeau">
                                    <div className="bandeau_titre"> <h4>Retours et remboursements</h4>
                                        <div>clavier 1</div>
                                        <div>clavier 2</div>
                                        <div>clavier 3</div>
                                        <div>clavier 4</div>
                                    </div>
                                    <div className="bandeau_titre"> <h4>Conditions générales</h4>
                                        <div>Politique de confidentialité</div>
                                        <div>clavier 2</div>

                                    </div>
                                    <div className="bandeau_titre"> <h4>Contact</h4>
                                        <div>Tél: 01 23 45 67 89</div>
                                        <div>Mail: keykraft-support@jsp</div>
                                        <div>Adresse: 123 rue du Clavier, Paris</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>,
                    document.body
                )}
        </div>
        
    );
}

export default FenetrePanier;
export { Searchbar }; 
export { Clavier };
export { Communauté };
export { Support };