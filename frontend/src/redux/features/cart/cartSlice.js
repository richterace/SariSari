import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 });  // Set initial quantity to 1
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "Item already added",
                    text: "You should pick a different one!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Okay!",
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
