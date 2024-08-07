import React from "react";
import { useDrop } from "react-dnd";

export default function Cart() {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PRODUCT",
    drop: (item) => addToCart(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addToCart = (productId) => {
    // Logic to add product to the cart
    console.log("Product added to cart:", productId);
  };

  return (
    <div ref={drop} className="cart" style={{ backgroundColor: isOver ? "lightblue" : "white" }}>
      <h2>Cart</h2>
      {/* Render cart items here */}
    </div>
  );
}

