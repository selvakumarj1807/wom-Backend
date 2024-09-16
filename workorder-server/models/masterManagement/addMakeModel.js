const { request } = require('express');
const mongoose = require('mongoose');

const AddMakeSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, "Pls enter the Make "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddMake', AddMakeSchema);

module.exports = schema;