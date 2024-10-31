const { request } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product: String,
    unit: String,
    amount: String,
    price: String,
});
 
const orderManagementVendorSchema = new mongoose.Schema({
    enquiryNumber: String,
    quoteNumber: String,
    orderNumber: String,
    userEmail: String,
    vendorEmail: String,
    contactName: String,
    mobile: String,
    address: String,
    city: String,
    pincode: String,
    state: String,
    quoteDate: String,
    vendorPaidDate: String,
    totalPaid: String,
    items: [ProductSchema],
    isRead: {
        type: Boolean,
        default: false // Default value for isRead is false
    },
    action: {
        type: String,
        default: 'Payment Successfully' // Default value for isRead is false
    },
    attachedFile: String, // Add this field to store the uploaded file name
    createdAt: { type: Date, default: Date.now },
})

let schema = mongoose.model('orderManagementVendor', orderManagementVendorSchema);

module.exports = schema;