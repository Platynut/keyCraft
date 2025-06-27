import React from "react";
const Main_category = ({img, title}) => {
    return (
        <div className="">
            <img src={img} alt="" />
            <h2>{title}</h2>
        </div>
    );
};

export default Main_category;