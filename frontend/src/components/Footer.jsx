import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer-container">
            <div className='footer-links'>
                <div className='footer-column'>
                    <h3>Claviers</h3>
                    <Link to="/">Accueil</Link> <br />
                    <Link to="/Clavier">Clavier</Link> <br />
                    <Link to="/Communauté">Communauté</Link> <br />
                    <Link to="/Support">Support</Link>  <br />
                </div>
                <div className='footer-column'>
                    <h3>Communauté</h3>
                    <Link to="/">Accueil</Link> <br />
                    <Link to="/Clavier">Clavier</Link> <br />
                    <Link to="/Communauté">Communauté</Link> <br />
                    <Link to="/Support">Support</Link>  <br />
                </div>
                <div className='footer-column'>
                    <h3>Support</h3>
                    <Link to="/">Accueil</Link> <br />
                    <Link to="/Clavier">Clavier</Link> <br />
                    <Link to="/Communauté">Communauté</Link> <br />
                    <Link to="/Support">Support</Link>  <br />
                </div>
                <div className='footer-column'>
                    <h3>KeyCraft</h3>
                    <Link to="/">Accueil</Link> <br />
                    <Link to="/Clavier">Clavier</Link> <br />
                    <Link to="/Communauté">Communauté</Link> <br />
                    <Link to="/Support">Support</Link>  <br />
                </div>
            </div>
            <Link to="/" className="main-button">KeyCraft</Link>
        </div>
    );
};

export default Footer;