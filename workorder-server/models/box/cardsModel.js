const { request } = require('express');
const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pls enter the product name"]
    },
    icon: {
        type: String,
        required: [true, "Pls enter icon"]
    },
    amount: {
        type: String,
        required: [true, "Pls enter amount"]
    },
    percentage: {
        type: String,
        required: [true, "Pls enter percentage"]
    },
    active: {
        type: String,
        required: [true, "Pls enter active"]
    },
    id: {
        type: String,
        required: [true, "Pls enter id"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('cards', CardsSchema);

module.exports = schema;