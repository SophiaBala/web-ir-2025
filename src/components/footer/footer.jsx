import React, { useState } from "react";
import "./footer.css";

const Footer = () => {

    return (
        <div className="footer-container">
            <div className="footer-links">
                <ul>
                <p>Support</p>
                <li>Contact Us</li>
                <li>Shipping info</li>
                <li>Returns</li>
                </ul>
                <ul>
                <p>Company</p>
                <li>About us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="contact-footer">
                <p>Join our weekly digest</p>
                <p className="footer-text">Get exclusive promotions</p>

                <form className="contact-form">
                <input type="email" placeholder="Email address"/>
                <button type="submit">Subscribe</button>
                </form>

            </div>
        </div>
    );
};

export default Footer;
