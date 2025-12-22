import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cameraproduct from "../../assets/camera-product.jpeg";
import axios from "axios";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.totalQuantity);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3001/api/products");
            const foundProduct = res.data.find((p) => p.id === parseInt(id, 10));
            if (foundProduct) {
            setProduct(foundProduct);
            } else {
            navigate("/catalog");
            }
        } catch (err) {
            console.error(err);
            navigate("/catalog");
        } finally {
            setLoading(false);
        }
        };
        fetchProduct();
    }, [id, navigate]);

    useEffect(() => {
        if (product) {
        if (product.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0]);
        } else if (product.color) {
            setSelectedColor(product.color);
        } else {
            setSelectedColor("");
        }
        }
    }, [product]);

    if (loading) return <Loader />;
    if (!product) return <p>Product not found</p>;

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, selectedColor }));
    };

    return (
        <div className="container product-details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Catalog
        </button>

        <div className="product-details-card">
            <img
            src={cameraproduct}
            alt={product.name}
            className="product-details-image"
            />
            <div className="product-details-info">
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>

            <div className="color-select-row">
                <label htmlFor="color-select">Color:</label>
                {product.colors && product.colors.length > 0 ? (
                <select
                    id="color-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="color-selector"
                >
                    {product.colors.map((c, idx) => (
                    <option key={idx} value={c}>
                        {c}
                    </option>
                    ))}
                </select>
                ) : product.color ? (
                <span className="single-color">{product.color}</span>
                ) : (
                <span className="no-color">No color</span>
                )}
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart ({cartCount})
            </button>
            </div>
        </div>
        </div>
    );
};

export default ProductDetails;
