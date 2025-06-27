import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
const FenetrePanier = ({bouton}) => {
    const [showpopup, setshowpopup] = useState(false);

    const togglepopup = () => {
        setshowpopup(!showpopup);
    };

    return (
        <div>
            
            <img onClick={togglepopup} src={bouton}/>
            {showpopup && 
                ReactDOM.createPortal(
                    
                    <div className="panier_container" onClick={togglepopup}>
                        <div className="panier" onClick={(e) => e.stopPropagation()}>
                            
                                <div className="panier_head">
                                    <img src="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png"/>
                                    <div className="">Mon Panier</div>
                                    <img className="cross" onClick={togglepopup} src="https://img.icons8.com/?size=50&id=VaHFapP3XCAj&format=png&color=ffffff"/>
                                </div>
                                <div className="panier_content_box">
                                    <div>
                                        <div className="panier_content" >
                                            <img className="miniature_panier" src="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png" alt="" />
                                            <div className="description">produit <br />spec <br />300.99€</div>

                                        </div>
                                        <div className="panier_content" >
                                            <img className="miniature_panier" src="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png" alt="" />
                                            <div className="description">produit <br />spec <br />300.99€</div>

                                        </div>
                                        <div className="panier_content" >
                                            <img className="miniature_panier" src="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png" alt="" />
                                            <div className="description">produit <br />spec <br />300.99€</div>

                                        </div>
                                    </div>
                                    <div className="panier_info">
                                        <div className="panier_total">
                                            <div className="sous_total"><div>Sous-total</div><div>00.0€</div></div>
                                        </div>
                                        <hr />
                                        <div className="panier_button"><Link to="/Page_paiement">Paiement</Link></div>
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

    const togglepopupclavier = () => {
        setshowpopup(!showpopupclavier);
    };

    return (
        <div>
            
            <div className="bouton_header" onClick={togglepopupclavier}>{bouton}</div>
            {showpopupclavier && 
                ReactDOM.createPortal(
                    <div className="bandeau_container" onClick={togglepopupclavier}>
                        <div className="" onClick={(e) => e.stopPropagation()}>
                            <div>
                                <div className="bandeau">
                                    <div className="bandeau_titre"> <h4>Meilleure vente</h4>
                                        <div>clavier 1</div>
                                        <div>clavier 2</div>
                                        <div>clavier 3</div>
                                        <div>clavier 4</div>
                                        <div>clavier 5</div>
                                        <div>clavier 6</div>
                                    </div>
                                    <div className="bandeau_titre"> <h4>Nouveautés</h4>
                                        <div>clavier 1</div>
                                        <div>clavier 2</div>
                                        <div>clavier 3</div>
                                        <div>clavier 4</div>
                                    </div>
                                    <div className="bandeau_titre"> <h4>Taille de clavier</h4>
                                        <div>Taille complète</div>
                                        <div>Ten Key Less</div>
                                        <div>Mini</div>
                                        
                                    </div>
                                    <div className="bandeau_titre"> <h4>Connectivité</h4>
                                        <div>Filiaire</div>
                                        <div>Sans fil</div>
                                        <div>Sans fil bluetooth</div>
                                        
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