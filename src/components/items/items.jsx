// src/components/ProductCard.jsx
import React from "react";
import PrimaryButton from "./PrimaryButton";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
            <h4>{product.name}</h4>
            <p>${product.price}</p>
        </div>
        <div className="product-footer">
            <PrimaryButton text="View more" />
        </div>
        </div>
    );
};

export default ProductCard;
