const { request } = require('express');
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    quantity: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('ProductVendor', ProductSchema);

module.exports = schema;