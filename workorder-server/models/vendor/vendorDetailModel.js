const { request } = require('express');
const mongoose = require('mongoose');

const VendorDetailSchema = new mongoose.Schema({
    businessName: {
        type: String,
        trim: true,
        maxLength: [100, "Business name cannot exceed 100 charecters"]
    },
    companyName: {
        type: String,
        trim: true,
        maxLength: [100, "Company name cannot exceed 100 charecters"]
    },
    streetAddress: {
        type: String,
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    postalCode: {
        type: Number,
    },
    bankName: {
        type: String,
        trim: true,
        maxLength: [100, "Bank name cannot exceed 100 charecters"]
    },
    brachName: {
        type: String,
        trim: true,
        maxLength: [100, "Branch name cannot exceed 100 charecters"]
    },
    accounterName: {
        type: String,
        trim: true,
        maxLength: [100, "accounter name cannot exceed 100 charecters"]
    },
    accountNumber: {
        type: String,
        trim: true,
        maxLength: [100, "Accounter Number cannot exceed 100 charecters"]
    },
    ifscCode: {
        type: String,
        trim: true,
        maxLength: [100, "IFSC code cannot exceed 100 charecters"]
    },
    upiId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('VendorDetail', VendorDetailSchema);

module.exports = schema;