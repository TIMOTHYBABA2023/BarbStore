import React from "react"

export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar--div">
                    <div className="navbar--logo">
                        <h3>Barb Show</h3>
                    </div>
                    <div className="nav--ref">
                        <div  className="nav--links">
                            <a href="/">Home</a>
                            <a href="/">Products</a>
                            <a href="/">Contact Us</a>
                        </div>
                        <div className="nav--button">
                                <button >Buy Now</button>
                        </div>
                    </div>
                   
            </div>
        </nav>       
    )
}