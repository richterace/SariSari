const mongoose = require('mongoose');

//create a schema
const orderSchema = new mongoose.Schema({

    // field
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    // when the field has chiildren
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

            type: mongoose.Schema.Types.ObjectId, // this id will come from the reference 'Book'
            ref: 'Book',
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // good practice
});

// initialize the method to export the model
const Order = mongoose.model('Order', orderSchema)

// export the module
module.exports = Order;