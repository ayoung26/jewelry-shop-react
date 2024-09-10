import { createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name: "userSlice",
    initialState: {
        name: "somy",
        age: 20,
    },
    reducers: {
        changeName(state, action) {
            state.name = action.payload;
        },
        changeAge(state, action) {
            state.age = action.payload;
        },
    },
});

export const { changeName, changeAge } = userSlice.actions;
export default userSlice.reducer;
