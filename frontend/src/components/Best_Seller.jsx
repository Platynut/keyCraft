import React, { useState, useEffect } from "react";
import Header from "./Header";
import Product from "./Product";
import Filtres from "./Filtres";
import { Link } from "react-router-dom";
import Footer from "./Footer";

async function fetchBestSellers() {
    try {
        const response = await fetch('http://localhost:8080/keyboards');
        if (!response.ok) {
            throw new Error('Error while fetching keyboards');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}

function Keyboards() {
    const [keyboards, setKeyboards] = useState([]);

    useEffect(() => {
        fetchBestSellers().then(setKeyboards);
    }, []);

    return (
        <div className="keyboards">
            <Header />
            <div className="boite">
                <Filtres text1="clavier" text2="keycaps" text3="switches" text4="accessoires" text5="clavier gamer"
                text6="clavier mécanique" text7="clavier ergonomique" text8="clavier silencieux" text9="clavier rétroéclairé" text10="clavier sans fil"/>
                <div className="best-seller-conteneur">
                    {keyboards.map((keyboard) => (
                        <div key={keyboard.id} className="best-seller-item">
                            <Link to="/">
                                <Product img={keyboard.url} title={keyboard.name} prix={keyboard.price} rating={keyboard.rating} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Keyboards;