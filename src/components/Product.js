import React from "react";

// Import all images dynamically
const images = require.context('../assets/images/products', false, /\.(png|jpe?g|svg)$/);

export default function Product(props) {
    const imageSrc = images(`./${props.image}`);
    
    return (
        <div className="product">
            <div className="product--list">
                <img src={imageSrc} alt={props.name} />
                <div className="product--details">
                    <h3>{props.category}</h3>
                    <p>Apple, Dell, Hp, Lenovo, Acer, Samsung, Microsoft, LG, Toshiba, Huawei ...<span className="bold">more</span></p>
                    <p>@{props.quantity}</p>
                    <button>View {props.category}</button>
                </div>
            </div>
        </div>
    );
}




