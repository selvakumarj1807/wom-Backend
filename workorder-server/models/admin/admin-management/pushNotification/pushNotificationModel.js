const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    email: String,
    readStatus: Boolean,
});

const NotificationSchema = new Schema({
    year: String,
    make: String,
    model: String,
    additionalNotes: String,
    email: [EmailSchema],
    enquiryNumber: String,
    enquiryDate: String,
    isRead: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('pushNotification', NotificationSchema);