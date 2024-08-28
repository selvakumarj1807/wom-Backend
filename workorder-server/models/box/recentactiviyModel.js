const { request } = require('express');
const mongoose = require('mongoose');

const RecentactiviySchema = new mongoose.Schema({
    time: {
        type: String,
        required: [true, "Pls enter the time"]
    },
    color: {
        type: String,
        required: [true, "Pls enter color"]
    },
    content: {
        type: String,
        required: [true, "Pls enter content"]
    },
    highlight: {
        type: String,
       // required: [true, "Pls enter highlight"]
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

let schema = mongoose.model('recentactiviy', RecentactiviySchema);

module.exports = schema;