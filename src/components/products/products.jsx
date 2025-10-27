import React from 'react'
import "./products.css"
import cameraproduct from "../../assets/camera-product.jpeg"

function products() {
    return (
    <div className='container'>
        <h2>Featured Cameras</h2>
        <div className="products-container">
            <div className="products-container-box">

                <div className="product-card">
                    <img src={cameraproduct} alt="camera" className="product-image"/>
                    <div className="product-info">
                        <h3 className="product-name">Nikon Z9</h3>
                    </div>

                    <div className="product-footer">
                        <span className="price">$5496</span>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="product-card">
                    <img src={cameraproduct} alt="camera" className="product-image"/>
                    <div className="product-info">
                        <h3 className="product-name">Nikon Z9</h3>
                    </div>

                    <div className="product-footer">
                        <span className="price">$5496</span>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="product-card">
                    <img src={cameraproduct} alt="camera" className="product-image"/>
                    <div className="product-info">
                        <h3 className="product-name">Nikon Z9</h3>
                    </div>

                    <div className="product-footer">
                        <span className="price">$5496</span>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="product-card">
                    <img src={cameraproduct} alt="camera" className="product-image"/>
                    <div className="product-info">
                        <h3 className="product-name">Nikon Z9</h3>
                    </div>

                    <div className="product-footer">
                        <span className="price">$5496</span>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
    )
}

export default products

