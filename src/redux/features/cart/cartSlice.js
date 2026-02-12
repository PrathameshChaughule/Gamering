import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: initialCart,
        cartCount: initialCart.length,
    },
    reducers: {
        addToCart: (state, action) => {
            const { gameId, game } = action.payload;
            const exists = state.items.find(
                (item) => item.id === gameId
            );
            if (!exists) {
                state.items.push({ ...game, quantity: 1 });
                state.cartCount = state.items.length;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.cartCount = state.items.length;
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        cartReset: (state) => {
            state.items = [];
            state.cartCount = 0;
            localStorage.removeItem("cart");
        }
    }
})

export const { addToCart, removeFromCart, cartReset } = cartSlice.actions;

export default cartSlice.reducer;