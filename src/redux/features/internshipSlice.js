import { createSlice } from "@reduxjs/toolkit";

export const internshipSlice = createSlice({
  name: "intern",
  initialState: {
    shoppingCart: [],
    isCartActive: false,
    cartItemsNumber: 0,
    cartSummary: 0,
    alertCheck: false,
  },
  reducers: {
    fetchIntern: (state, action) => {
      const { name, imgSrc, quantity, price } = action.payload;
      const index = state.shoppingCart.findIndex((item) => item.name === name);
    },

    updateIntern: (state) => {
      state.shoppingCart = [];
      state.cartItemsNumber = 0;
      state.cartSummary = 0;
    },

    addIntern: (state, action) => {
      const { name, price } = action.payload;
      const index = state.shoppingCart.findIndex((item) => item.name === name);
    },

    handleActive: (state) => {
      state.isCartActive = !state.isCartActive;
    },

    closeAlert: (state) => {
      state.alertCheck = false;
    },
  },
});

// States
export const cartValue = (state) => state.cart.shoppingCart;
export const isCartActive = (state) => state.cart.isCartActive;
export const cartItemsNumber = (state) => state.cart.cartItemsNumber;
export const cartSummary = (state) => state.cart.cartSummary;
export const alertCheck = (state) => state.cart.alertCheck;

// Action creators are generated for each case reducer function
export const { addToCart, handleActive, resetCart, incrementQnty, decrementQnty, closeAlert } = internshipSlice.actions;

export default internshipSlice.reducer;
