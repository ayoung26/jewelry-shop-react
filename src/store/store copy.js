import { configureStore, createSlice } from "@reduxjs/toolkit";

// userSlice
let userSlice = createSlice({
    name: "userSlice", // 보관통 이름
    initialState: {
        name: "somy",
        age: 20,
    }, // 초기값
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

// stockSlice
let stockSlice = createSlice({
    name: "stockSlice",
    initialState: {
        products: [10, 20, 30, 50, 100],
    },
});

// cartSlice
let cartSlice = createSlice({
    name: "cartSlice",
    initialState: [
        {
            id: 3,
            title: "14k 데일리 심플 볼귀걸이 시리즈",
            img: "image3.jpg",
            price: 30000,
            category: "top",
            discount: 45,
            count: 1,
        },
        {
            id: 8,
            title: "진주 헤어핀 스타일링 5종 연예인 스타일 옆머리 고정삔 5종",
            img: "image8.jpg",
            price: 54000,
            category: "new",
            discount: 10,
            count: 2,
        },
    ],
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
        },
    },
});
export const { increase, decrease, deleteItem } = cartSlice.actions;

// export
export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer, // 내보낼때 아예 reducer 를 써놓으면 받아올때 편함
        // userSlice: userSlice, // 이렇게 내보내면 받는 부분에서 reducer 를 작성해도 에러남
        stockSlice: stockSlice.reducer,
        cartSlice: cartSlice.reducer,
    },
});
