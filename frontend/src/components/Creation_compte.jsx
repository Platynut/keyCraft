import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const Creation_compte = () => {
    return (
        <div className="profile">
            <Header />
            <div className="profile-container">
            <div className="profile-box">
                <h1>Créez votre compte KeyCraft</h1>
                    <form className="profile-form">
                    <div>Nom d'utilisateur</div> 
                    <input className="inputbox" type="text" id="username" name="username" required />
                    <br />
                    <div>Mot de passe</div> 
                    <input className="inputbox" type="password" id="password" name="password" required />
                    <br />
                    <button className="button" type="submit">Créer</button>
                    <div><p>Vous avez déjà un compte ?</p> <Link to="/AcceuilProfile"><button className="button" type="button">Se connecter</button></Link></div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Creation_compte;