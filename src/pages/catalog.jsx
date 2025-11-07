import React, { useState } from "react";
import cameraproduct from "../assets/camera-product.jpeg";
import productsData from "../data";
import "../components/products/products.css";

function Catalog() {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Лічильник товарів у кошику

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
        setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleAddToCart = () => {
        setCartCount((prevCount) => prevCount + 1); // Додає 1 при кожному кліку
    };

    const filteredProducts = productsData.filter((product) => {
        const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesPrice =
        priceFilter === "" ||
        (priceFilter === "under" && product.price < 1000) ||
        (priceFilter === "over" && product.price >= 1000);
        const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
        return matchesBrand && matchesPrice && matchesSearch;
    });

    const visibleProducts = showAll
        ? filteredProducts
        : filteredProducts.slice(0, 6);

    return (
        <div className="container">
        <div className="catalog-header">
            <h2>Featured Cameras</h2>
            <div
            className="cart-info"
            style={{ color: cartCount === 0 ? "red" : "white" }}
            >
            Cart: {cartCount}
            </div>
        </div>

        <div className="products-container">
            <div className="products-filter-container">
            <h4>Filter</h4>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
            />

            <ul>
                <p className="filter-text">Brand</p>
                {["Canon", "Sony", "Fujifilm", "Olympus", "Nikon"].map((brand) => (
                <li key={brand}>
                    <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                </li>
                ))}
            </ul>

            <ul>
                <p className="filter-text">Price</p>
                <li>
                <input
                    type="radio"
                    name="price"
                    checked={priceFilter === "under"}
                    onChange={() => setPriceFilter("under")}
                />
                Under $1000
                </li>
                <li>
                <input
                    type="radio"
                    name="price"
                    checked={priceFilter === "over"}
                    onChange={() => setPriceFilter("over")}
                />
                Over $1000
                </li>
                <li>
                <input
                    type="radio"
                    name="price"
                    checked={priceFilter === ""}
                    onChange={() => setPriceFilter("")}
                />
                All
                </li>
            </ul>
            </div>

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
                    <button
                        className="add-to-cart"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    </div>
                </div>
                ))
            ) : (
                <p className="no-results">No products found.</p>
            )}

            {filteredProducts.length > 6 && (
                <button
                className="show-more-btn"
                onClick={() => setShowAll(!showAll)}
                >
                {showAll ? "Show Less" : "Show More"}
                </button>
            )}
            </div>
        </div>
        </div>
    );
}

export default Catalog;
