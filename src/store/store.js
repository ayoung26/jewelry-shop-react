import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userStore";
import cartSlice from "./cartStore";
import stockSlice from "./stockStore";
import productSlice from "./productStore";

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        stockSlice: stockSlice,
        cartSlice: cartSlice,
        productSlice: productSlice,
    },
    // devTools: import.meta.env.MODE !== "production",
});
