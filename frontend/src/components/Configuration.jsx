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
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://pbs.twimg.com/media/FS3sDIKWQAUzeBs.jpg"
                        title="Configuration l'ane" prix="150€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuration;