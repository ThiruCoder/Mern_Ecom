import { configureStore } from "@reduxjs/toolkit";
import { ProductDataReducer } from "./Redux_Reducer";

const store = configureStore({
    reducer: {
        ProductData: ProductDataReducer.reducer
    }
})

export default store;