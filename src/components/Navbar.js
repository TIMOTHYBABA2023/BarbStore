import React from "react"
import logo from "../assets/images/logo.png"

export default function Navbar(){
    return (
        <div className="navbar"> 
            <div className="navbar--div">
                <div className="navbar--img">
                    <img  src={logo} alt="Logo" />
                </div>
                    <div className="nav--text">
                        <p>Home</p>
                        <p>Products</p>
                        <p>Contact Us</p>
                    </div>
                    <div className="nav--button"><button >Buy Now</button></div>
            </div>

        </div>
       
    )
}