import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        increaseItemInCart: (state, action) => {
            //Проверка на наличие товара в корзине
            const existingItem = state.cart.find(
                (item) => item.id === action.payload.id
            );

            existingItem
                ? (existingItem.quantity += 1)
                : state.cart.push({
                      ...action.payload,
                      quantity: 1,
                  });
        },

        decreaseItemInCart: (state, action) => {
            const existingItem = state.cart.find(
                (item) => item.id === action.payload.id
            );

            existingItem && existingItem.quantity > 0
                ? (existingItem.quantity -= 1)
                : (existingItem.quantity = 0);

            if (existingItem.quantity === 0) {
                const index = state.cart.indexOf(existingItem);
                state.cart.splice(index, 1);
            }
        },

        deleteFromCart: (state, action) => {
            const existingItem = state.cart.find(
                (item) => item.id === action.payload.id
            );

            const index = state.cart.indexOf(existingItem);
            state.cart.splice(index, 1);
        },

        deleteAllFromCart: (state) => {
            state.cart = [];
        },
    },
});

export const {
    increaseItemInCart,
    decreaseItemInCart,
    deleteFromCart,
    deleteAllFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
