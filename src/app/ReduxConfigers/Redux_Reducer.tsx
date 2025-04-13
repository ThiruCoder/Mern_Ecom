import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    Loading: false,
    error: '',
}

export const ProductDataReducer = createSlice({
    name: 'ProductData',
    initialState,
    reducers: {
        getProductData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { getProductData } = ProductDataReducer.actions;
export default ProductDataReducer.reducer;