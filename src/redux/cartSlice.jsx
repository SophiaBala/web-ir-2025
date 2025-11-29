import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

    const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
        const product = action.payload;
        const existingItem = state.items.find(
            (item) =>
            item.id === product.id &&
            (item.selectedColor ?? null) === (product.selectedColor ?? null)
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push({ ...product, quantity: 1 });
        }

        state.totalQuantity = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        state.totalPrice = state.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        localStorage.setItem("cart", JSON.stringify(state));
        },

        delFromCart: (state, action) => {
        const product = action.payload;
        const existingItemIndex = state.items.findIndex(
            (item) =>
            item.id === product.id &&
            (item.selectedColor ?? null) === (product.selectedColor ?? null)
        );

        if (existingItemIndex !== -1) {
            const existingItem = state.items[existingItemIndex];
            existingItem.quantity -= 1;

            if (existingItem.quantity <= 0) {
            state.items.splice(existingItemIndex, 1);
            }
        }

        state.totalQuantity = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        state.totalPrice = state.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        localStorage.setItem("cart", JSON.stringify(state));
        },

        removeFromCart: (state, action) => {
        const { id, selectedColor = null } = action.payload;
        const index = state.items.findIndex(
            (item) =>
            item.id === id &&
            (item.selectedColor ?? null) === (selectedColor ?? null)
        );

        if (index !== -1) {
            state.items.splice(index, 1);

            state.totalQuantity = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
            );
            state.totalPrice = state.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
            );

            localStorage.setItem("cart", JSON.stringify(state));
        }
        },

        loadCartFromStorage: (state) => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            return JSON.parse(storedCart);
        }
        return state;
        },
    },
});

export const { addToCart, removeFromCart, delFromCart, loadCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
