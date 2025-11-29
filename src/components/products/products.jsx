import React, { useState } from 'react';
import './products.css';
import cameraproduct from '../../assets/camera-product.jpeg';



function Products() {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const handlePriceChange = (priceRange) => {
        setSelectedPrices((prev) =>
        prev.includes(priceRange)
            ? prev.filter((p) => p !== priceRange)
            : [...prev, priceRange]
        );
    };

    
    const filteredProducts = productsData.filter((product) => {
        const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

        const priceMatch =
        selectedPrices.length === 0 ||
        selectedPrices.some((range) => {
            if (range === 'under1000') return product.price < 1000;
            if (range === 'over1000') return product.price >= 1000;
            return true;
        });

        return brandMatch && priceMatch;
    });

return (
    <div className="container">
        <h2>Featured Cameras</h2>
        <div className="products-container">
        <div className="products-filter-container">
            <h4>Filter box</h4>

            <ul>
                <p className="filter-text">Brand</p>
                {['Canon', 'Sony', 'Fujifilm', 'Olympus'].map((brand) => (
                <li key={brand}>
                    <label>
                    <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                    </label>
                </li>
                ))}
            </ul>

            <ul>
                <p className="filter-text">Price</p>
                <li>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedPrices.includes('under1000')}
                    onChange={() => handlePriceChange('under1000')}
                    />
                    Under $1000
                </label>
                </li>
                <li>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedPrices.includes('over1000')}
                    onChange={() => handlePriceChange('over1000')}
                    />
                    Over $1000
                </label>
                </li>
            </ul>
        </div>

        <div className="products-container-box">
            {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                <img
                    src={product.image}
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
            ))}
            {filteredProducts.length === 0 && <p>No products found.</p>}
        </div>
    </div>
    </div>
);
}

export default Products;
