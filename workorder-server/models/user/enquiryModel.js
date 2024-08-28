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
        // enum: {
        //     values: [
        //         'option-1',
        //         'option-2',
        //         'option-3',
        //     ],
        //     message: "Pls Select Correct shipping Method"
        // }
    }, 
    state: {
        type: String,
    },
    additionalNotes : {
        type: String,
        },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
})

let schema = mongoose.model('Enquiry', EnquiryModelSchema);

module.exports = schema;