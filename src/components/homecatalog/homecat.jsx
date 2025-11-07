import React, { useState } from "react";
import cameraproduct from "../../assets/camera-product.jpeg";
import productsData from "../../data";

function FullCatalog() {
    const [showAll, setShowAll] = useState(false);

    const visibleProducts = showAll
        ? productsData
        : productsData.slice(0, 6);

    return (
        <div className="products-container-box">
        {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
            <div key={product.id} className="product-card">
                <img
                src={cameraproduct}
                alt={product.name}
                className="product-image"
                />
                <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                </div>
                <div className="product-footer">
                <span className="price">${product.price}</span>
                </div>
            </div>
            ))
        ) : (
            <p className="no-results">No products found.</p>
        )}

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

export default FullCatalog;
