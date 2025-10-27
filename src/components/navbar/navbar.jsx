import React, { useState } from 'react'
import "./navbar.css"
import logo from "../../assets/logo.png"


const navbar = () => {


    return (
    <nav className='container'>
        <div className="logo-container">
            <img src={logo} className = "logo"></img >
            <h3>CameraShop</h3>
        </div>

        <ul>
            <li>Home</li>
            <li>Cameras</li>
        </ul>
    </nav>
    )
}

export default navbar