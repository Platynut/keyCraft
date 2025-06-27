import Header from "./Header.jsx";
import Collection from "./Collection.jsx";
import Footer from "./Footer.jsx";
import Annonce from "./Annonce.jsx";
import React from "react";

const Accueil = () => {
  return (
    <div>
        
      <Header />
      <div className="bienvenue">Bienvenue sur notre site de clavier personalisables !</div>
      <Annonce />
      <div className="main">
        <Collection />
      </div>
      <Footer />
    </div>
  );
}

export default Accueil;
