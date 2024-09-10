import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ page = 1, perPage = 6, sort = "", category = "" }) => {
        const BASE_URL = "http://localhost:8000/products";

        // URL 구성 수정: 카테고리 파라미터 추가
        let url = `${BASE_URL}?_page=${page}&_per_page=${perPage}&_sort=${sort}`;
        if (category) {
            url += `&category=${category}`;
        }
        let res = await fetch(url);
        let data = await res.json();
        return data;
    }
);

// 새로운 thunk 추가: 단일 제품 정보 가져오기
export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct",
    async (id) => {
        const BASE_URL = "http://localhost:8000/products";
        let res = await fetch(`${BASE_URL}/${id}`);
        let data = await res.json();
        return data;
    }
);

let productSlice = createSlice({
    name: "products",
    initialState: {
        item: [],
        singleProduct: null, // 단일 제품 정보를 위한 새로운 state
        moreInfo: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.data;
                state.moreInfo = {
                    first: action.payload.first,
                    prev: action.payload.prev,
                    next: action.payload.next,
                    last: action.payload.last,
                    page: action.payload.page,
                    total: action.payload.items,
                };
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.singleProduct = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
