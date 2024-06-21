import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: cartReducerInitialState = {
  loading: true,
  cartItems: [],
  subtotal: 0,
  shippingCharges: 0,
  tax: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      if (state.cartItems.length === 0) {
        state.shippingCharges = 0;
      } else {
        state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      }
      state.tax = Math.round(state.subtotal * 0.02);
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.discount = action.payload;
      state.loading = false;
    }, 
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload
    },
    resetCart:()=>initialState
  },
 
});

export const { addToCart, removeCartItem, calculatePrice, discountApplied,saveShippingInfo,resetCart } =
  cartReducer.actions;
