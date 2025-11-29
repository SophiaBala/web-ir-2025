import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.includes("@")) {
        setMessage("Please enter a valid email address.");
        return;
        }

        console.log("Subscribed with:", email);

        setMessage("Thank you for subscribing!");
        setEmail("");
    };

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

            <form className="contact-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Subscribe</button>
            </form>

            {message && <p className="subscribe-message">{message}</p>}
        </div>
        </div>
    );
};

export default Footer;
