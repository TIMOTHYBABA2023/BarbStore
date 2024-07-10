import React from "react";

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
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>No products in the cart.</p>
            ) : (
                <table>
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
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1}>-</button>
                                    <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                    <button onClick={() => handleRemove(product.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={onBackToHome}>Back to Home</button>
        </div>
    );
}
