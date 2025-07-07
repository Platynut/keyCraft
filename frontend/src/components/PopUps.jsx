import React, { useState, useEffect, use } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import PagePaiement from "./Page_paiement";
import './css/PopUps.css';
const FenetrePanier = ({ bouton }) => {
    const [showpopup, setshowpopuppanier] = useState(false);
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        if (showpopup) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(storedCart);
            setSubtotal(storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
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
        setshowpopuppanier(!showpopup);
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

    const idclient = localStorage.getItem('idclient');

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
                                                    <div className="panier_qte_group">
                                                        <button className="panier_qte_btn" onClick={() => {
                                                            const newCart = cart.map((it) => {
                                                                if (it.id === item.id && it.name === item.name) {
                                                                    return { ...it, quantity: it.quantity - 1 };
                                                                }
                                                                return it;
                                                            }).filter(it => it.quantity > 0);
                                                            setCart(newCart);
                                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                                            setSubtotal(newCart.reduce((sum, it) => sum + it.price * it.quantity, 0));
                                                        }}>-</button>
                                                        <span style={{margin: '0 8px'}}>{item.quantity}</span>
                                                        <button className="panier_qte_btn" onClick={() => {
                                                            const currentStock = item.stock ?? 99;
                                                            if (item.quantity < currentStock) {
                                                                const newCart = cart.map((it) => {
                                                                    if (it.id === item.id && it.name === item.name) {
                                                                        return { ...it, quantity: it.quantity + 1 };
                                                                    }
                                                                    return it;
                                                                });
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
                                    {idclient ? (
                                        <PagePaiement cart={cart} subtotal={subtotal} idclient={idclient} />
                                    ) : (
                                        <div className="panier_button">
                                            <button className="btn_commander" onClick={() => window.location.href = '/Login'}>
                                                Se connecter pour commander
                                            </button>
                                        </div>
                                    )}
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
    const [query, setQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    
    useEffect(() => {
        if (showPopup) {
            var listeProduits = []
            setIsLoading(true);
            fetch('http://localhost:3080/keyboard')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    listeProduits.push(...data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError('Erreur lors du chargement');
                    setIsLoading(false);
                });

            fetch('http://localhost:3080/keycaps')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    listeProduits.push(...data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError('Erreur lors du chargement');
                    setIsLoading(false);
                });
            setProduits(listeProduits);
        }
    }, [showPopup]);    
    const produitsFiltres = produits.filter(p =>
        p.name && p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <img className="bouton_recherche" onClick={togglePopup} src={bouton}/>
            {showPopup && 
                ReactDOM.createPortal(
                    <div className="searchbar">
                        <div className="input_cross" onClick={(e) => e.stopPropagation()}>

                            <input 
                            className="input_searchbar" 
                            placeholder="Rechercher un produit"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            />
                            <img className="searchbar_cross" onClick={togglePopup} src="https://img.icons8.com/?size=50&id=VaHFapP3XCAj&format=png&color=ffffff" alt="" />
                        </div> 

                        {isLoading && <div>Chargement...</div>}
                        {error && <div>{error}</div>}
                        
                        {!isLoading && !error && (
                            <ul className="resultats">
                                {produitsFiltres.length > 0 ? (
                                    produitsFiltres.map(produit => {
                                        const link = produit.switches ? `/keyboard/${produit.id}` : `/keycap/${produit.id}`;
                                        return (
                                            <li  key={produit.id} >
                                                <Link className="li_searchbar" to={link}>
                                                    <img className="image_resultat" src={produit.url}  />
                                                    <div className="description_li_searchbar">
                                                        <div>{produit.name}</div>
                                                        <div>{produit.price} €</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li>Aucun résultat</li>
                                )}
                            </ul>
                    )}
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
                                        <div>Clavier du mois</div>
                                        <div>KeyCap du mois</div>
                                        <div>Forum</div>
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
                                        <div>Je fais un retour</div>
                                        <div>Je veux me faire rembourser</div>
                                        <div>Autre demande</div>
                                    </div>
                                    <div className="bandeau_titre"> <h4>Informations essentielles</h4>
                                        <div>Politique de confidentialité</div>
                                        <div>Conditions générales</div>
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