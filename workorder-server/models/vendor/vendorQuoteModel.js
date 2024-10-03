const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productname: String,
    description: String,
    quantity: String,
    price: String,
});

const vendorQuoteSchema = new Schema({
    customerName: String,
    enquiryNumber: String,
    quoteNumber: String,
    email: String,
    quoteDate: String,
    items: [ProductSchema],
    isRead: {
        type: Boolean,
        default: false // Default value for isRead is false
    },
    action: {
        type: String,
        default: 'Bending' // Default value for isRead is false
    },
    attachedFile: String, // Add this field to store the uploaded file name
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('vendorQuote', vendorQuoteSchema);