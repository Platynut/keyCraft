import React, { useState, useEffect } from "react";
import IMG2 from "./image/IMG2.jpg";
import IMG3 from "./image/IMG3.jpg";
import IMGN1 from "./image/IMGN1.jpg";
const images = [
  IMG2,
  IMG3,
    IMGN1,
];

const Annonce = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <img src={images[index]} alt={`Slide ${index}`} className="carousel-img" />
      
    </div>
  );
};

export default Annonce;