const { request } = require('express');
const mongoose = require('mongoose');

const AddCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Pls enter the category "],
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AddCategory', AddCategorySchema);

module.exports = schema;