import React from "react";
import Main_category from "./Main_category.jsx";
import { Link } from "react-router-dom";
const Collection = () => {
    return (
        
        <div className="collection">
            
            <Link to="/Keyboards" className="collection-item">
            <Main_category img="https://m.media-amazon.com/images/I/719h65mTOEL._AC_SX569_.jpg" title="Claviers" /></Link>

            <Link to="/Configuration" className="collection-item">
            <Main_category img="https://f.nooncdn.com/p/pzsku/ZC0ABE07F0970E6E4E35CZ/45/_/1723258207/38bdfa14-efbe-4f2c-84aa-9c0f23467318.jpg?width=800" title="Configurations" /></Link>

            <Link to="/Keycaps" className="collection-item">
            <Main_category img="https://m.media-amazon.com/images/I/61ppN4MimVL._AC_UF1000,1000_QL80_.jpg" title="Keycaps" /></Link>

        </div>
        
    );
};

export default Collection;