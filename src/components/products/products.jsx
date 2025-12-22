import React from "react";
import "./products.css";
import cameraproduct from "../../assets/camera-product.jpeg";

function Products() {
    return (
        <div className="container">
            <h2>Featured Cameras</h2>

            <div className="products-container">
                <div className="products-filter-container">
                    <h4>Filter box</h4>

                    <ul>
                        <p className="filter-text">Brand</p>
                        <li><input type="checkbox" disabled /> Canon</li>
                        <li><input type="checkbox" disabled /> Sony</li>
                        <li><input type="checkbox" disabled /> Fujifilm</li>
                        <li><input type="checkbox" disabled /> Olympus</li>
                    </ul>

                    <ul>
                        <p className="filter-text">Price</p>
                        <li><input type="checkbox" disabled /> Under $1000</li>
                        <li><input type="checkbox" disabled /> Over $1000</li>
                    </ul>
                </div>

                <div className="products-container-box">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div className="product-card" key={item}>
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
                </div>
            </div>
        </div>
    );
}

export default Products;
