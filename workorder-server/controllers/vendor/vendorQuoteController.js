const ErrorHandler = require('../../utils/errorHandler');
const VendorQuote = require('../../models/vendor/vendorQuoteModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

exports.newVendorQuote = catchAsyncError(async(req, res, next) => {
    // Extract the file name if the file exists
    const attachedFile = req.file ? req.file.filename : null;

    // Parse the items array, since it's being sent as a string
    const items = req.body.items ? JSON.parse(req.body.items) : [];

    // Create the new vendor quote with the correct data structure
    const vendorQuote = await VendorQuote.create({
        customerName: req.body.customerName,
        quoteNumber: req.body.quoteNumber,
        items: items,
        attachedFile, // Save the file name in the DB
        enquiryNumber: req.body.enquiryNumber, // If enquiryNo is sent, include it
        quoteDate: req.body.quoteDate,
        email: req.body.email,

    });

    res.status(201).json({
        success: true,
        vendorQuote,
    });
});

// GET - Retrieve vendor quotes
exports.getVendorQuote = catchAsyncError(async(req, res, next) => {
    const vendorQuote = await VendorQuote.find();

    res.status(200).json({
        success: true,
        count: vendorQuote.length,
        vendorQuote,
    });
});

// GET - Retrieve vendor quotes
exports.getUnreadVendorQuote = catchAsyncError(async(req, res, next) => {
    const vendorQuote = await VendorQuote.find({ isRead: false });

    res.status(200).json({
        success: true,
        count: vendorQuote.length,
        vendorQuote,
    });
});


const path = require('path');
const fs = require('fs'); // File system module to access files

// Download attached file
exports.downloadAttachedFile = catchAsyncError(async(req, res, next) => {
    const filename = req.params.filename;

    // Construct the file path
    const filePath = path.join(__dirname, '../../uploads', filename);

    // Check if the file exists before trying to serve it
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return next(new ErrorHandler('File not found', 404));
        }

        // Set headers and send the file
        res.download(filePath, (err) => {
            if (err) {
                return next(new ErrorHandler('Error in file download', 500));
            }
        });
    });
});

exports.getVendorQuoteByEmail = async(req, res, next) => {

    const email = req.params.email;
    const apiFeatures = new APIFeatures(VendorQuote.findOne({ email: email }), req.query).search().filter();

    const vendorQuote = await apiFeatures.query;
    if (!vendorQuote) {
        return next(new ErrorHandler('Vendor Quote not found', 404));
    }
    res.status(200).json({
        success: true,
        count: vendorQuote.length,
        vendorQuote
    })
};

//update product - /api/v1/product/:id
exports.updateVendorQuote = async(req, res, next) => {
    try {
        let vendorQuote = await VendorQuote.findById(req.params.id);

        if (!vendorQuote) {
            return res.status(404).json({
                success: false,
                message: "enquiry not found"
            });
        }

        vendorQuote = await VendorQuote.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            vendorQuote
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getVendorQuoteByQNoAndQDate = async (req, res, next) => {
    const qno = req.params.qno;
    const quoteDate = req.query.quoteDate;

    // Build the query using both qno and quoteDate
    const apiFeatures = new APIFeatures(
        VendorQuote.findOne({ quoteNumber: qno, quoteDate: quoteDate }), 
        req.query
    ).search().filter();

    const vendorQuote = await apiFeatures.query;

    if (!vendorQuote) {
        return next(new ErrorHandler('Vendor Quote not found', 404));
    }

    res.status(200).json({
        success: true,
        vendorQuote
    });
};
