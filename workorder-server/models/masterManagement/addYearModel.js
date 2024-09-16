const { request } = require('express');
const mongoose = require('mongoose');

const AddYearSchema = new mongoose.Schema({
    year: {
        type: String,
        required: [true, "Pls enter the Year "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddYear', AddYearSchema);

module.exports = schema;