const { request } = require('express');
const mongoose = require('mongoose');

const AddStateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, "Pls enter the State "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddState', AddStateSchema);

module.exports = schema;