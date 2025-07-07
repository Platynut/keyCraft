import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer-container" role="contentinfo">
            <div className='footer-links'>
                <div className='footer-column'>
                    <h3>Keycraft</h3>
                    <Link to="/">Accueil</Link> <br />
                    <Link to="/">Clavier</Link> <br />
                    <Link to="/">Communauté</Link> <br />
                    <Link to="/">Support</Link>  <br />
                </div>
                <div className='footer-column'>
                    <h3>Claviers</h3>
                    <Link to="/">Full size</Link> <br />
                    <Link to="/">Clavier 75%</Link> <br />
                    <Link to="/">Clavier 60%</Link> <br />
                    <Link to="/">TKL</Link>  <br />
                </div>
                <div className='footer-column'>
                    <h3>Communauté</h3>
                    <Link to="/">Meilleurs Concepts</Link> <br />
                    <Link to="/">Jeu concours</Link> <br />
                    <Link to="/">Forum</Link> <br />
                </div>
                <div className='footer-column'>
                    <h3>Support</h3>
                    <Link to="/">Tél: 01 23 45 67 89</Link> <br />
                    <Link to="/">Mail: keykraft-support@jsp</Link> <br />
                    <Link to="/">Adresse: 123 rue du Clavier, Paris</Link> <br />
                    <Link to="/">Aide et Retours</Link>  <br />
                </div>
            </div>
            <div onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} className="main-button">KeyCraft</div>
        </footer>
    );
};

export default Footer;