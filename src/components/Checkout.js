import React from "react";
import { useState } from "react";

export default function Checkout({ cart, categories }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        streetAddress: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const getCategoryProducts = (category) => {
        return cart.filter(product => product.category === category);
    };

    const calculateCategorySubtotal = (categoryProducts) => {
        let subtotal = 0;
        categoryProducts.forEach(product => {
            subtotal += parseFloat(product.price);
        });
        return subtotal.toFixed(2);
    };

    const calculateShippingTotal = () => {
        let shippingTotal = 0;
        cart.forEach(product => {
            shippingTotal += parseFloat(product.shipping_price);
        });
        return shippingTotal.toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
        const shippingTotal = calculateShippingTotal();
        return (subtotal + parseFloat(shippingTotal)).toFixed(2);
    };

    return (
        <div className="checkout">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name*</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country/Region*</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="streetAddress">Street Address</label>
                    <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State*</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number*</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Other Notes</label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Place Order</button>
            </form>

            <div className="order-summary">
                <h2>Order Summary</h2>
                {categories.map(category => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <p>Number of Products: {getCategoryProducts(category).length}</p>
                        <p>Subtotal: ${calculateCategorySubtotal(getCategoryProducts(category))}</p>
                        <p>Shipping Total: ${calculateShippingTotal()}</p>
                    </div>
                ))}
                <div className="total-to-pay">
                    <h3>Total to Pay:</h3>
                    <p>${calculateTotal()}</p>
                </div>
            </div>

            <div className="payment-options">
                <h2>Payment Options</h2>
                <div className="card-options">
                    <img src="/visa.png" alt="Visa Card" />
                    <img src="/mastercard.png" alt="MasterCard" />
                </div>
                <div className="payment-methods">
                    <label>
                        <input type="radio" name="paymentMethod" value="debit/credit card" />
                        Debit/Credit Card
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" value="bank" />
                        Bank Transfer
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" value="cash" />
                        Cash on Delivery
                    </label>
                </div>
            </div>
        </div>
    );
};


