const { request } = require('express');
const mongoose = require('mongoose');

const AddStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, "Pls enter the Status "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddStatus', AddStatusSchema);

module.exports = schema;