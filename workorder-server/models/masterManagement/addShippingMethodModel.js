const { request } = require('express');
const mongoose = require('mongoose');

const AddShippingMethodSchema = new mongoose.Schema({
    shippingMethod: {
        type: String,
        required: [true, "Pls enter the ShippingMethod "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddShippingMethod', AddShippingMethodSchema);

module.exports = schema;