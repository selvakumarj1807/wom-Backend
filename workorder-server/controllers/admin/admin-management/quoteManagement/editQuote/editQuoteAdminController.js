const editQuoteAdmin = require('../../../../../models/admin/admin-management/quoteManagement/editQuote/editQuoteAdminModel');
const ErrorHandler = require('../../../../../utils/errorHandler');
const catchAsyncError = require('../../../../../middlewares/catchAsyncError');
const APIFeatures = require('../../../../../utils/apiFeatures');

//create editQuoteAdmin - /api/v1/admin/editQuoteAdmin/new

exports.newEditQuoteAdmin = catchAsyncError(async(req, res, next) => {
    // Extract the file name if the file exists
    const attachedFile = req.file ? req.file.filename : null;

    // Parse the items array, since it's being sent as a string
    const items = req.body.items ? JSON.parse(req.body.items) : [];

    const editQuoteForword = await editQuoteAdmin.create({
        invoiceNumber: req.body.invoiceNumber,
        enquiryNumber: req.body.enquiryNumber,
        items: items,
        attachedFile, // Save the file name in the DB
        quoteNumber: req.body.quoteNumber, // If enquiryNo is sent, include it
        quoteDate: req.body.quoteDate,
        forwordDate: req.body.forwordDate,
        total: req.body.total,
        email: req.body.email,

    });

    res.status(201).json({
        success: true,
        editQuoteForword,
    });
});

//get editQuoteAdmin - /api/v1/admin/editQuoteAdmin
exports.getEditQuoteAdmin = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(editQuoteAdmin.find(), req.query).search().filter();

    const editQuoteForword = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: editQuoteForword.length,
        editQuoteForword
    })
}

//get single editQuoteAdmin - /api/v1/admin/editQuoteAdmin/:id
const mongoose = require('mongoose');

exports.getSingleEditQuoteAdmin = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return next(new ErrorHandler(`Resource not found: ${req.params.id}`, 400));
        }

        const editQuoteForword = await editQuoteAdmin.findById(req.params.id);

        if (!editQuoteForword) {
            return next(new ErrorHandler('edit Quote Admin not found', 404));
        }

        res.status(200).json({
            success: true,
            editQuoteForword
        });
    } catch (err) {
        next(err);
    }
};

const path = require('path');
const fs = require('fs'); // File system module to access files

// Download attached file
exports.downloadQuoteAttachedFile = catchAsyncError(async(req, res, next) => {
    const filename = req.params.filename;

    // Construct the file path
    const filePath = path.join(__dirname, '../../../../../invoices', filename);

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


//update editQuoteAdmin - /api/v1/admin/editQuoteAdmin/:id
exports.updateEditQuoteAdmin = async (req, res, next) => {
    try {
        let editQuoteForword = await editQuoteAdmin.findById(req.params.id);

        if (!editQuoteForword) {
            return res.status(404).json({
                success: false,
                message: "edit Quote Admin not found"
            });
        }

        editQuoteForword = await editQuoteAdmin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            editQuoteForword
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getForwardEditQuoteAdminByEmail = async(req, res, next) => {

    const email = req.params.email;
    const apiFeatures = new APIFeatures(editQuoteAdmin.findOne({ email: email }), req.query).search().filter();

    const editQuoteForword = await apiFeatures.query;
    if (!editQuoteForword) {
        return next(new ErrorHandler('EditQuoteForword not found', 404));
    }
    res.status(200).json({
        success: true,
        count: editQuoteForword.length,
        editQuoteForword
    })
};

exports.getForwardEditQuoteAdminByQNoAndQDate = async (req, res, next) => {
    const ino = req.params.ino;
    const forwordDate = req.query.forwordDate;

    // Build the query using both qno and quoteDate
    const apiFeatures = new APIFeatures(
        editQuoteAdmin.findOne({ invoiceNumber: ino, forwordDate: forwordDate }), 
        req.query
    ).search().filter();

    const editQuoteForword = await apiFeatures.query;

    if (!editQuoteForword) {
        return next(new ErrorHandler('Invoice not found', 404));
    }

    res.status(200).json({
        success: true,
        editQuoteForword
    });
};

exports.getForwardEditQuoteAdminUnread = catchAsyncError(async(req, res, next) => {
    const email = req.query.emailCookie;

    const editQuoteForword = await editQuoteAdmin.find({ isRead: false, email: email });

    res.status(200).json({
        success: true,
        count: editQuoteForword.length,
        editQuoteForword,
    });
});

exports.updateForwardEditQuoteAdminUnread = async(req, res, next) => {
    try {
        let editQuoteForword = await editQuoteAdmin.findById(req.params.id);

        if (!editQuoteForword) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        editQuoteForword = await editQuoteAdmin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            editQuoteForword
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}