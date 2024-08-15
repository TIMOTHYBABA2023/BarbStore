import React, { useEffect, useState } from "react";
import Product from "./Product";
import image_12 from "../assets/images/products/image 12.jpg";

export default function Products({ onProductClick }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:9999/api/v1/products/products')
      .then(response => response.json())
      .then(data => {
        
        const shuffledProducts = data.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="products">
      <div className="home-div">
        <img src={image_12} alt="homepage pic" />
      </div>
      {products.map((product) => (
        <Product key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  );
}

