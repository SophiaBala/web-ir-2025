import React from 'react'
import "./hero.css"
import camerahero from "../../assets/hero-camera.webp"

const hero = () => {
    return (
        <div className="container">
            <div className='hero'>
                <div className="hero-text-container">
                    <h1>Capture every moment perfectly</h1>
                    <p>Discover professional-grade cameras and lenses for photographers who demand excellence.</p>
                </div>

                <img src={camerahero} className = "camera-hero"></img >
            </div>
        </div>

    )
}

export default hero