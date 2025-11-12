import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
    },
    reducers: {
        addItemInOrder: (state, action) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addItemInOrder } = orderSlice.actions;
export default orderSlice.reducer;
