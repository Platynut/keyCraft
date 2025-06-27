import React from "react";
const Product = ({img, title, prix, text1, text2, text3}) => {
    return (
        <div className="">
            <img src={img} alt="" />
            <div className="productinfo">
                <div className="producttitle">{title}</div>
                <div className="productprix">{prix}</div>
                <div className="listattribut">
                    <li className="">{text1}</li>
                    <li className="">{text2}</li>
                    <li className="">{text3}</li>
                </div>
            </div>
        </div>
    );
};

export default Product;