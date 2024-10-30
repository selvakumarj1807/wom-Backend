const { request } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product: String,
    unit: String,
    amount: String,
    price: String,
});
 
const orderManagementSchema = new mongoose.Schema({
    invoiceNumber: String,
    enquiryNumber: String,
    quoteNumber: String,
    orderNumber: String,
    orderDate: String,
    email: String,
    quoteDate: String,
    forwordDate: String,
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

let schema = mongoose.model('orderManagement', orderManagementSchema);

module.exports = schema;