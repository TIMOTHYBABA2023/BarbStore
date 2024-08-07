import React, { useEffect, useState } from "react";
import Product from "./Product";
import products from "./products.json";
import image_12 from "../assets/images/products/image 12.jpg";

export default function Products({ onProductClick }) {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffledProducts);
  }, []);

  return (
    <div className="products">
      <div className="home-div">
        <img src={image_12} alt="homepage pic" />
      </div>
      {randomProducts.map((product) => (
        <Product key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  );
}
