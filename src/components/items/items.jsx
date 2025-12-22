import React from "react";
import "./ProductCard.css";
import cameraproduct from "../../assets/camera-product.jpeg";

const ProductCard = () => {
    return (
        <div className="product-card">
            <img
                src={cameraproduct}
                alt="Camera"
                className="product-image"
            />
            <div className="product-info">
                <h4>Camera Model</h4>
                <p>$0000</p>
            </div>
            <div className="product-footer">
                <button disabled>View more</button>
            </div>
        </div>
    );
};

export default ProductCard;
