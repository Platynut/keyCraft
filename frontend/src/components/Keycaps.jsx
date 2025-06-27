import React from "react";
import Header from "./Header";
import Filtres from "./Filtres";
import Product from "./Product";
import { Link } from "react-router-dom";
const Keycaps = () => {
    return (
        <div className="configuration">
            <Header />
            <div className="boite">
                <Filtres text1="clavier" text2="keycaps" text3="switches" text4="accessoires" text5="clavier gamer"
                text6="clavier mécanique" text7="clavier ergonomique" text8="clavier silencieux" text9="clavier rétroéclairé" text10="clavier sans fil"/>
                <div className="best-seller-conteneur">
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTjfG3ia2duL25yVJ4ozBNJaSFx5GbQT5heZfPLGtn9A4Jufej42Kt-XXQcodklSqFaY&usqp=CAU"
                        title="Touche joker degueu" prix="19.99€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Keycaps;