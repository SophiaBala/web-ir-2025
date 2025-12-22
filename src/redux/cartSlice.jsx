import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return { items: [], totalQuantity: 0, totalPrice: 0 };
    return JSON.parse(localStorage.getItem(`cart_${user.email}`)) || { items: [], totalQuantity: 0, totalPrice: 0 };
};

const saveCartToStorage = (state) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state));
    }
};

const initialState = getCartFromStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalPrice = action.payload.totalPrice;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === product.id && (item.selectedColor ?? null) === (product.selectedColor ?? null)
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

            saveCartToStorage(state);
        },
        delFromCart: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex(
                (item) => item.id === product.id && (item.selectedColor ?? null) === (product.selectedColor ?? null)
            );

            if (index !== -1) {
                const existingItem = state.items[index];
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) state.items.splice(index, 1);
            }

            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

            saveCartToStorage(state);
        },
        removeFromCart: (state, action) => {
            const { id, selectedColor = null } = action.payload;
            const index = state.items.findIndex(
                (item) => item.id === id && (item.selectedColor ?? null) === (selectedColor ?? null)
            );
            if (index !== -1) {
                state.items.splice(index, 1);
                state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
                saveCartToStorage(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            saveCartToStorage(state);
        },
    },
});

export const { addToCart, delFromCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
