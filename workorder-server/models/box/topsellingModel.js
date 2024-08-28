const { request } = require('express');
const mongoose = require('mongoose');

const TopsellingSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Pls enter the productName"]
    },
    company: {
        type: String,
        required: [true, "Pls enter company"]
    },
    engineCode: {
        type: String,
        required: [true, "Pls enter engineCode"]
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    deleveryDate: {
        type: String,
        required: [true, "Pls deleveryDate"]
    }
})

let schema = mongoose.model('topselling', TopsellingSchema);

module.exports = schema;