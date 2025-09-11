import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';


const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id == action.payload._id); //checking if there's added item on the cart
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else (
                Swal.fire({
                    title: "Item already added",
                    text: "You should pick different one!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Okay!"
                })
            )
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

// export the action
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer
