import React, { useState } from "react";
import cameraproduct from "../../assets/camera-product.jpeg";
import productsData from "../../data"; 
import "./homecatalog.css";

function HomeCatalog() {
    const [showAll, setShowAll] = useState(false);

    const visibleProducts = showAll
        ? productsData
        : productsData.slice(0, 6);

    return (
        <div className="home-catalog-container">
            <h2 className="home-catalog-title">Featured Cameras</h2>

            <div className="home-products-box">
                {visibleProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src={cameraproduct}
                            alt={product.name}
                            className="product-image"
                        />

                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <span className="price">${product.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            {productsData.length > 6 && (
                <button
                    className="show-more-btn"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}

export default HomeCatalog;
