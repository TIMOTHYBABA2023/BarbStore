import React from "react";
import Products from "../Products";
import Herosection from "../herosection/Herosection";
import CustomButton from "../CustomButton";

export default function Homescreen({ onProductSelect }) {

    return (
        <div className="homescreen">
            <Herosection />
            <Products onProductSelect={onProductSelect} />
            <CustomButton />
        </div>
    );
}


