import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.count += 1;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    increment: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.count += 1;
    },
    decrement: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, fetchCart } = cartSlice.actions;
export default cartSlice.reducer;