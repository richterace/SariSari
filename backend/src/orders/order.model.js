const mongoose = require('mongoose');

// Create a schema
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        city: {
            type: String,
            required: true
        },
        country: String,
        state: String,
        zipcode: String
    },

    phone: {
        type: Number,
        required: true
    },

    productIds: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, // reference to the 'Book' model
                ref: 'Book',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Initialize the model
const Order = mongoose.model('Order', orderSchema);

// Export the model
module.exports = Order;
