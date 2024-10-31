const { request } = require('express');
const mongoose = require('mongoose');

const EnquiryModelSchema = new mongoose.Schema({
    year: {
        type: String,

    },
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    enquiryNumber: {
        type: String,
    },
    contactName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    shippingMethod: {
        type: String,
    },
    state: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    additionalNotes: {
        type: String,
    },
    enquiryDate: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false // Default value for isRead is false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Enquiry', EnquiryModelSchema);

module.exports = schema;