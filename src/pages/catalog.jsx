import React from "react";
import cameraproduct from "../assets/camera-product.jpeg";
import "../components/products/products.css";

function Catalog() {
    return (
        <div className="container">
            <div className="catalog-header">
                <h2>Featured Cameras</h2>
                <div className="cart-info">
                    Cart: 0
                </div>
            </div>

            <div className="products-container">
                {/* FILTER (тільки вигляд) */}
                <div className="products-filter-container">
                    <h4>Filter</h4>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-box"
                        disabled
                    />

                    <ul>
                        <p className="filter-text">Brand</p>
                        <li><input type="checkbox" disabled /> Canon</li>
                        <li><input type="checkbox" disabled /> Sony</li>
                        <li><input type="checkbox" disabled /> Fujifilm</li>
                        <li><input type="checkbox" disabled /> Olympus</li>
                        <li><input type="checkbox" disabled /> Nikon</li>
                    </ul>

                    <ul>
                        <p className="filter-text">Price</p>
                        <li><input type="radio" disabled /> Under $1000</li>
                        <li><input type="radio" disabled /> Over $1000</li>
                        <li><input type="radio" disabled /> All</li>
                    </ul>
                </div>

                {/* PRODUCTS GRID */}
                <div className="products-container-box">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="product-card">
                            <img
                                src={cameraproduct}
                                alt="Camera"
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-name">Camera Model</h3>
                            </div>
                            <div className="product-footer">
                                <span className="price">$0000</span>
                                <button className="add-to-cart" disabled>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="show-more-btn" disabled>
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
