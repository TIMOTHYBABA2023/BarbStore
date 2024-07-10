import React, { useState } from "react";
import './App.css';
import Homescreen from './components/herosection/Homescreen';
import Phonecategory from "./components/phonecategory/Phonecategory";
import Shoppingcart from "./components/shoppingcart/Shoppingcart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [view, setView] = useState("homescreen");

    // Function to handle product selection from Homescreen
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setView("phonecategory"); // Navigate to Phonecategory after selecting product
    };

    // Function to handle product selection from Phonecategory
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCart([...cart, { ...product, quantity: 1 }]); // Add selected product to cart with initial quantity
        setView("shoppingcart"); // Navigate to Shoppingcart after selecting product
    };

    // Function to reset selected product and view
    const handleBackToHome = () => {
        setSelectedProduct(null);
        setView("homescreen"); // Navigate back to Homescreen
    };

    return (
        <div className="App">
            <Navbar />
            <div className="mid--section">
            {view === "homescreen" && (
                <Homescreen onProductSelect={handleProductSelect} />
            )}
            {view === "phonecategory" && (
                <Phonecategory selectedProduct={selectedProduct} onProductClick={handleProductClick} />
            )}
            {view === "shoppingcart" && (
                <Shoppingcart cart={cart} setCart={setCart} onBackToHome={handleBackToHome} />
            )}
            </div>
           
            <Footer />
            {/* <Shoppingcart cart={cart} setCart={setCart} onBackToHome={handleBackToHome} /> */}

        </div>
    );
}
