import React, { useState } from "react";
import imagephone from "../../assets/images/products/phone 1.png";
import deleteicon from "../../assets/images/delete.png";
import Checkout from "../Checkout"; 
import allproducts from "../categoryitems.json";

export default function Shoppingcart({ cart, setCart, onBackToHome }) {
    const [showCheckout, setShowCheckout] = useState(false); 

    const handleRemove = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleQuantityChange = (productId, delta) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        ));
    };

    const getImage = (imageName) => {
        try {
            return require(`../../assets/images/products/${imageName}`).default;
        } catch (error) {
            return null; 
        }
    };

    const calculateTotal = () => {
        let subTotal = 0;
        let shippingTotal = 0;

        cart.forEach(product => {
            subTotal += parseFloat(product.price) * product.quantity;
            shippingTotal += parseFloat(product.shipping_price);
        });

        const total = subTotal + shippingTotal;
        return {
            subTotal: subTotal.toFixed(2),
            shippingTotal: shippingTotal.toFixed(2),
            total: total.toFixed(2)
        };
    };

    const toggleCheckout = () => {
        setShowCheckout(!showCheckout);
    };

    const proceedToCheckout = () => {
        console.log("Proceed to Checkout clicked!");
    };

    return (
        <div className="shoppingcart">
            <div className="cart">
                <div className="phoneimage">
                    <img src={imagephone} alt="Phone--image" />
                </div>
                <div>
                    {cart.length === 0 ? (
                        <p>No products in the cart.</p>
                    ) : (
                        <table className="cart--table">
                            <thead>
                                <tr>
                                    <th>Product (image)</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(product => (
                                    <tr key={product.id}>
                                        <td><img src={getImage(product.image)} alt={product.name} style={{ width: '50px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>${parseFloat(product.price).toFixed(2)}</td>
                                        <td>
                                            <div className="quantity-control">
                                                <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1}>-</button>
                                                <span>{product.quantity}</span>
                                                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                            </div>
                                        </td>
                                        <td>${(parseFloat(product.price) * product.quantity).toFixed(2)}</td>
                                        <td>
                                            <div onClick={() => handleRemove(product.id)}><img src={deleteicon} alt="deleteIcon" /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="summary-card">
                        <h3>Cart Total</h3>
                        <div>
                            <span>Sub-total:</span>
                            <span>${calculateTotal().subTotal}</span>
                        </div>
                        <div>
                            <span>Shipping:</span>
                            <span>${calculateTotal().shippingTotal}</span>
                        </div>
                        <div>
                            <span>Total:</span>
                            <span>${calculateTotal().total}</span>
                        </div>
                        <button className="proceed-button" onClick={toggleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <button onClick={onBackToHome}>Back to Home</button>

            {showCheckout && (
                <Checkout cart={cart} categories={allproducts.categories} />
            )}
        </div>
    );
}
