import React, { useState } from 'react'
import "./navbar.css"
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

const navbar = () => {

    const [menu, setMenu] = useState("shop")

    return (
    <nav className='container'>
        <div className="logo-container">
            <img src={logo} className = "logo"></img >
            <h3>CameraShop</h3>
        </div>

        <ul>
            <li onClick={()=>{setMenu("shop")}}><Link to="/">Home</Link> {menu ==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("catalog")}}><Link to="/catalog">Cameras</Link> {menu ==="catalog"?<hr/>:<></>}</li>

        </ul>
    </nav>
    )
}

export default navbar