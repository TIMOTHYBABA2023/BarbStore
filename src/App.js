// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer";
// import Homepage from "./components/homepage";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminPage from "./components/adminpage";
// import './App.css';

// export default function App() {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Homepage />} />
//                 <Route path="/admin" element={<AdminPage />} />
//             </Routes>
//             <Footer />
//         </Router>
//     );
// }

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/homepage";
import AdminPage from "./components/adminpage";
import Cart from "./components/cart";
import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Find existing product with the same ID and image
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.image === product.image
      );
      if (existingProduct) {
        // If found, increase quantity
        return prevCart.map((item) =>
          item.id === product.id && item.image === product.image
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add as new item
        return [...prevCart, product];
      }
    });
    setIsCartVisible(true); // Show the cart when a product is added
  };

  const updateQuantity = (productId, image, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.image === image
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      )
    );
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Router>
      <Navbar cartItemCount={cartItemCount} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Homepage 
              addToCart={addToCart} 
              cart={cart} 
              updateQuantity={updateQuantity} 
              isCartVisible={isCartVisible}
            />
          } 
        />
        <Route path="/admin" element={<AdminPage />} />
        {isCartVisible && <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />}
      </Routes>
      <Footer />
    </Router>
  );
}
