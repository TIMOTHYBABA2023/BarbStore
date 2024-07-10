import React from "react";
import Navbar from "../Navbar";
import Searchsection from "../herosection/Searchsection";
import image12 from "../../assets/images/image 12.png"

export default function Herosection(){
    return (
        <div className="herosection">
            <div className="herosection--div">
                <Searchsection />
                <img src={image12} alt="Logo" className="my--image" />
            </div>    
        </div>
    )
}
