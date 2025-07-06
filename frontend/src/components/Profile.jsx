import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const AcceuilProfile = () => {
    return (
        <div className="profile">
            <Header />
            <div className="profile-container">
                <div className="profile-box">
                    <h1>Connexion à votre compte KeyCraft</h1>
                    <form className="profile-form">
                        <div>Nom d'utilisateur</div> 
                        <input className="inputbox" type="text" id="username" name="username" required />
                        <br />
                        <div>Mot de passe</div> 
                        <input className="inputbox" type="password" id="password" name="password" required />
                        <br />
                        <button className="button" type="submit">Connexion</button>
                        <div><p>Vous n'avez pas de compte ?</p> <Link to="/Creation_compte"><button className="button" type="button">Créer un compte</button></Link></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AcceuilProfile;