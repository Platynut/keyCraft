import React from "react";
import Header from "./Header";
import Product from "./Product";
import Filtres from "./Filtres";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const Best_Seller = () => {
    return (
        <div className="">
            <Header />
            <div className="boite">
                <Filtres text1="clavier" text2="keycaps" text3="switches" text4="accessoires" text5="clavier gamer"
                text6="clavier mécanique" text7="clavier ergonomique" text8="clavier silencieux" text9="clavier rétroéclairé" text10="clavier sans fil"/>
                <div className="best-seller-conteneur">
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                    <div className="best-seller-item">
                        <Link to="/" className="nodecoration"><Product img="https://images.rtl.fr/~c/2000v2000/rtl/www/1449859-shrek-dans-shrek-4-il-etait-une-fin.jpg"
                        title="clavier shreck" prix="200€" text1="groslard" text2="groslardon" text3="petitlard"/></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Best_Seller;