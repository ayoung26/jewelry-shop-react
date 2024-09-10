import { createSlice } from "@reduxjs/toolkit";

let stockSlice = createSlice({
    name: "stockSlice",
    initialState: {
        products: [10, 20, 30, 50, 100],
    },
});

export default stockSlice.reducer;
