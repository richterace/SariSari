
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    category: String,

    trending: {
        type: Boolean,
        required: true,
    },

    coverImage: {
        type: String,
        required: true,
    },

    oldPrice: {
    type: Number,
    required: true,
    validate: {
        validator: function (v) {
        // Check if it's a number and not NaN
        return typeof v === 'number' && !isNaN(v);
        },
        message: props => `${props.value} is not a valid number!`
    }
    },
    newPrice: {
    type: Number,
    required: true,
    validate: {
        validator: function (v) {
        // Check if it's a number and not NaN
        return typeof v === 'number' && !isNaN(v);
        },
        message: props => `${props.value} is not a valid number!`
    }
    },
    createdAt: {
        type: Date,
        default: Date.now,

    }
}, {
    timestamps: true,
});


const Item = mongoose.model('Item', itemSchema)

module.exports = Item;