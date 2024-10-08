import React from "react"
import email from "../assets/images/gmail.png"
import facebook from "../assets/images/facebook.png"
import instagram from "../assets/images/instagram.png"
import linkedin from "../assets/images/linkedin.png"
import phoneicon from "../assets/images/vector/image copy 2.png"
import locationicon from "../assets/images/vector/image copy.png"
import copyrighticon from "../assets/images/vector/image.png"

export default function Footer(){
    return (
        <div className="footer">
            <div className="footer--div">
                    <div className="footer--media">
                    <h1>Barb Show</h1>
                        {/* <img src={logo} alt="Logo" /> */}
                        <h2>Wear it <span>Loud!!!</span></h2>
                        <div>
                            <img src={email} alt="" />
                            <img src={facebook} alt="" />
                            <img src={instagram} alt="" />
                            <img src={linkedin} alt="" />
                        </div>
                    </div>
                    <div className="footer--contact">
                        <div className="contact--us">
                                <h2>Contact Us</h2>
                                <div className="address--icon">
                                <img src={locationicon} alt="" />
                                <p>3rd Mainland, Kosofe, Lagos, Nigeria.</p>
                            </div>
                        
                            <div className="address--icon">
                                <img src={phoneicon} alt="" />
                                <div>
                                    <div>+234 905 612 0000</div>
                                    <div>+234 912 000 0356</div>
                                </div>
                                
                            </div>
                    </div>
                        <div className="company">
                            <h2>Company</h2>
                            <div>
                                <div>About Us</div>
                                <div>Products</div>
                                <div>Join Us</div>
                            </div>
                            
                        </div>
                    </div>
            </div>
            <div className="copyright">
                <div className="copyright--div">
                    <img src={copyrighticon} alt="copyright-icon" />
                </div>
                <p>2024 Everything Footwear. All Rights Reserved</p>
            </div>
            
        </div>
    )
}