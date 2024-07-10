import React from "react";
import imagephone from "../../assets/images/products/phone 1.png"
import allproducts from "../categoryitems.json"

export default function Shoppingcart({ cart, setCart, onBackToHome }) {
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

    return (
        <div className="shoppingcart">
        <div className="cart">
        <div className="phoneimage">
                <img src={imagephone} alt="Phone--image" />
            </div>
            <div >
                {cart.length === 0 ? (
                    <p>No products in the cart.</p>
                ) : (
                    <table className="cart--table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product => (
                                <tr key={product.id}>
                                    <td><img src={getImage(product.image)} alt={product.name} style={{ width: '50px' }} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                            <div className="quantity-control">
                                                <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1}>-</button>
                                                <span>{product.quantity}</span>
                                                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                            </div>
                                        </td>
                                    <td>
                                        <button onClick={() => handleRemove(product.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
        </div>
           
            <button onClick={onBackToHome}>Back to Home</button>
        </div>
    );
}


