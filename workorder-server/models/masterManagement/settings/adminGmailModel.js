const { request } = require('express');
const mongoose = require('mongoose');

const AdminGmailSchema = new mongoose.Schema({
    adminGmail: {
        type: String,
        required: [true, "Pls enter the AdminGmail "],
        trim: true,
    },
    gmailSubject: {
        type: String,
        required: [true, "Pls enter the gmailSubject "],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('AdminGmail', AdminGmailSchema);

module.exports = schema;