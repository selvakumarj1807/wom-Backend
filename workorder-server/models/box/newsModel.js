const { request } = require('express');
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, "Pls enter the img"]
    },
    title: {
        type: String,
        required: [true, "Pls enter title"]
    },
    subtitle: {
        type: String,
        required: [true, "Pls enter subtitle"]
    },
    category: {
        type: String,
        required: [true, "Pls enter category"]
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

let schema = mongoose.model('news', NewsSchema);

module.exports = schema;