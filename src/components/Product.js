import React from "react";
import imagesPath from "./imageHelper";

export default function Product({ product, onClick }) {
  const randomImage = product.images[0];
  const productImage = imagesPath[randomImage.image];

  return (
    <div className="product--div" onClick={onClick}>
      <img src={productImage} alt={product.name} />
      <div className="product--details">
        <h5>{randomImage.color}</h5>
        <p>{randomImage.price}</p>
      </div>
    </div>
  );
}

