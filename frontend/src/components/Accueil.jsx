import Header from "./Header.jsx";
import Collection from "./Collection.jsx";
import Footer from "./Footer.jsx";
import Annonce from "./Annonce.jsx";
import React from "react";

const Accueil = () => {
  return (
    <div>
        
      <Header />
      <div className="bienvenue">
      <div className="bleufr"></div><div className="blancfr">Bienvenue sur notre site de clavier Français !</div><div className="rougefr"></div>
      </div>
      <div className="main">
        <Annonce />
        <Collection />

      </div>
      <div className="footer-container">
      <Footer />
    </div>
    </div>
  );
}

export default Accueil;
