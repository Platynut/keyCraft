import React from "react";
function Product ({img, title, prix, rating}) {
    return (
        <div className="">
            <img src={img} alt="" />
            <div className="productinfo">
                <div className="producttitle">{title}</div>
                <div className="productprix">{prix}€</div>
                <div className="rating">{rating}</div>
            </div>
        </div>
    );
};

export default Product;