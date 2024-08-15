import React from "react";

export default function Product({ product, onClick }) {
  const { imageUrl, name, color, price } = product;

  const productImage = `http://localhost:9999/images/${imageUrl}`;

  return (
    <div className="product--div" onClick={onClick}>
      <img src={productImage} alt={name || "No Name Available"} />
      <div className="product--details">
        <h5>{color || "No Color Available"}</h5>
        <p>{price || "No Price Available"}</p>
      </div>
    </div>
  );
}


