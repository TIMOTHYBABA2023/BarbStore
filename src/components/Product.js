import React from "react";

const images = require.context('../assets/images/products', false, /\.(png|jpe?g|svg)$/);

export default function Product(props) {
    const imageSrc = images(`./${props.image}`);

    return (
        <div className="product--list">
          <img src={imageSrc} alt={props.name} className="product--image" />
          <div className="product--details">
                <div className="product--inner">
                    <h3>{props.category}</h3>
                    <p>
                    Apple, Dell, Hp, Lenovo, Acer, Samsung, Microsoft, LG, Toshiba,
                    Huawei ...<span className="bold">more</span>
                    </p> 
                    <p><span className="bold">{props.quantity}  Products</span></p>
                </div>
                <div className="product--butt">
                    <button>View {props.category}</button>
                </div>  
          </div>
        </div>
      );
}




