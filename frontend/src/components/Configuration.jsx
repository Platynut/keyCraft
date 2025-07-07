import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Filtres from "./KeyboardFilter";
import Product from "./Product";
import { Link } from "react-router-dom";
const Configuration = () => {
    return (
        <div className="configuration">
            <Header />
            <div className="boite">
                <Filtres text1="clavier" text2="keycaps" text3="switches" text4="accessoires" text5="clavier gamer"
                text6="clavier mécanique" text7="clavier ergonomique" text8="clavier silencieux" text9="clavier rétroéclairé" text10="clavier sans fil"/>
                <div className="best-seller-conteneur">
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800"
                        title="Configuration" prix="50"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800"
                        title="Configuration" prix="50" /></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800"
                        title="Configuration" prix="50" /></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800"
                        title="Configuration" prix="50" /></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800"
                        title="Configuration" prix="50" /></Link>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Configuration;