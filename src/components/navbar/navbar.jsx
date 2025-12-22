import React, { useState } from 'react'
import "./navbar.css"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'

const navbar = () => {

    const [menu, setMenu] = useState("shop")
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("user");

        navigate("/");
    }
    return (
    <nav className='container'>
        <div className="logo-container">
            <img src={logo} className = "logo"></img >
            <h3>CameraShop</h3>
        </div>

        <ul>
            <li onClick={()=>{setMenu("shop")}}><Link to="/home">Home</Link> {menu ==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("catalog")}}><Link to="/catalog">Cameras</Link> {menu ==="catalog"?<hr/>:<></>}</li>
            <Link to="/cart">Cart</Link>

        </ul>
        <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
        </button>
    </nav>
    )
}

export default navbar