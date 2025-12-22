import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cameraproduct from "../../assets/camera-product.jpeg";
import axios from "axios";
import Loader from "../loader/loader";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3001/products`);
            const foundProduct = res.data.find(p => p.id === parseInt(id));
            if (foundProduct) setProduct(foundProduct);
            else navigate("/catalog");
        } catch (err) {
            console.error(err);
            navigate("/catalog");
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [id, navigate]);

    if (loading) return <Loader />;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="container product-details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Catalog
        </button>

        <div className="product-details-card">
            <img src={cameraproduct} alt={product.name} className="product-details-image" />
            <div className="product-details-info">
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            
            </div>
        </div>
        </div>
    );
};

export default ProductDetails;
