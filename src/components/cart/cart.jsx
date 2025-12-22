import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, delFromCart } from "../../redux/cartSlice";
import "./cart.css";
import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';


function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.totalQuantity);


    return (
        <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>

        {cart.items.length === 0 ? (
            <p className="cart-empty">Cart is empty</p>
        ) : (
            <ul className="cart-list">
            {cart.items.map((item) => (
                <li className="cart-item" key={`${item.id}-${item.selectedColor ?? "none"}`}>
                <span className="item-info">
                    {item.name} {item.selectedColor ? `(${item.selectedColor})` : ""} ${item.price * item.quantity}
                </span>

                <button
                    className="remove-btn"
                    onClick={() =>
                    dispatch(removeFromCart({ id: item.id, selectedColor: item.selectedColor ?? null }))
                    }
                >
                    Remove
                </button>
                <button
                    className="del-from-cart"
                    onClick={(e) => {
                    e.stopPropagation();
                    dispatch(delFromCart({ ...item, selectedColor: item.selectedColor ?? null }));
                    }}
                >
                    -
                </button>
                <p className="quantity">{item.quantity}</p>
                <button
                    className="add-to-cart"
                    onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart({ ...item, selectedColor: item.selectedColor ?? null }));
                    }}
                >
                    +
                </button>
                </li>
            ))}
            </ul>
        )}

        <div className="cart-summary">
            <p>Total Quantity: {cart.totalQuantity}</p>
            <p>Total Price: ${cart.totalPrice}</p>
            <button><Link to="/checkout">checkout</Link></button>
        </div>
        </div>
    );
}

export default Cart;
