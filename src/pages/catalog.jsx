import React, { useState, useEffect } from "react";
import axios from "axios";
import cameraproduct from "../assets/camera-product.jpeg";
import "../components/products/products.css";
import Loader from "../components/loader/loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../redux/cartSlice";

function Catalog() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCount = useSelector(state => state.cart.totalQuantity);

    const [productsData, setProductsData] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedBrands.length > 0) params.brand = selectedBrands.join(",");
            if (priceFilter) params.price = priceFilter;
            if (search) params.search = search;

            const res = await axios.get("http://localhost:3001/api/products", { params });
            setProductsData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedBrands, priceFilter, search]);

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const visibleProducts = showAll ? productsData : productsData.slice(0, 6);

    return (
        <div className="container">
            <div className="catalog-header">
                <h2>Featured Cameras</h2>
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
                    {loading ? (
                        <Loader />
                    ) : visibleProducts.length > 0 ? (
                        visibleProducts.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => navigate(`/catalog/${product.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={cameraproduct} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                </div>
                                <div className="product-footer">
                                    <span className="price">${product.price}</span>
                                    <button
                                        className="add-to-cart"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToCart(product));
                                        }}
                                    >
                                        Add to Cart ({cartCount})
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No products found.</p>
                    )}

                    {productsData.length > 6 && !loading && (
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
