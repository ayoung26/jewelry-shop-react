import { createSlice } from "@reduxjs/toolkit";
let initialState = JSON.parse(localStorage.getItem("cartData")) || [];

let cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        increase: (state, action) => {
            let num = state.findIndex((item) => item.id === action.payload);
            state[num].count++;
        },
        decrease: (state, action) => {
            let num = state.findIndex((item) => item.id === action.payload);
            state[num].count--;
        },
        deleteItem: (state, action) => {
            let num = state.findIndex((item) => item.id === action.payload);
            state.splice(num, 1);
            localStorage.setItem("cartData", JSON.stringify(state));
        },
        addItem: (state, action) => {
            let num = state.findIndex((item) => item.id === action.payload.id);
            if (num === -1) state.unshift(action.payload);
            if (num !== -1) state[num].count += action.payload.count;
            localStorage.setItem("cartData", JSON.stringify(state));
        },
    },
});

export const { increase, decrease, deleteItem, addItem } = cartSlice.actions;
export default cartSlice.reducer;
