import React from "react";
import { Link } from "react-router-dom";
import FenetrePanier, {Searchbar, Clavier, Communauté, Support} from "./PopUps";



const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="main-button">KeyCraft</Link>
            <div className='header-links'>
                <Link to="/">Accueil</Link>
                <Clavier bouton="Clavier"></Clavier>
                <Communauté bouton="Communauté"></Communauté>
                <Support bouton="Support"></Support>
            </div>
            <div className='header-icons'>
                <Searchbar bouton="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png"/>
                <Link to="/Profile"><img src="https://img.icons8.com/windows/50/FFFFFF/user-male-circle.png" alt="profile" /></Link>
                <FenetrePanier bouton="https://img.icons8.com/glyph-neue/50/FFFFFF/shopping-cart.png"/>
            </div>
        </div>
    );
};

export default Header;