const { request } = require('express');
const mongoose = require('mongoose');

const RecentsalesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Pls enter productName"]
    },
    product: {
        type: String,
        required: [true, "Pls enter product"]
    },
    modelNumber: {
        type: String,
        required: [true, "Pls enter modelNumber"]
    },
    status: {
        type: String,
        required: [true, "Pls enter status"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('recentsales', RecentsalesSchema);

module.exports = schema;