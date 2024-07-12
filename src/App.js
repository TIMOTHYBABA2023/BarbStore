import React, { useState } from "react";
import './App.css';
import Homescreen from './components/herosection/Homescreen';
import Phonecategory from "./components/phonecategory/Phonecategory";
import Shoppingcart from "./components/shoppingcart/Shoppingcart";
import Checkout from "./components/Checkout"; // Import Checkout component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import allproducts from "./components/categoryitems.json"; // Import the JSON file

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [view, setView] = useState("homescreen");

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setView("phonecategory"); 
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCart([...cart, { ...product, quantity: 1 }]); 
        setView("shoppingcart"); 
    };

    const handleBackToHome = () => {
        setSelectedProduct(null);
        setView("homescreen"); 
    };

    const handleProceedToCheckout = () => {
        setView("checkout");
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
                    <Shoppingcart cart={cart} setCart={setCart} onBackToHome={handleBackToHome} onProceedToCheckout={handleProceedToCheckout} />
                )}
                {view === "checkout" && (
                    <Checkout cart={cart} categories={allproducts.categories} />
                )}
            </div>
            <Footer />
        </div>
    );
}
