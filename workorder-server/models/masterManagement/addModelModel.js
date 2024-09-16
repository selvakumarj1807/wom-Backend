const { request } = require('express');
const mongoose = require('mongoose');

const AddModelSchema = new mongoose.Schema({
    model: {
        type: String,
        required: [true, "Pls enter the Model "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddModel', AddModelSchema);

module.exports = schema;