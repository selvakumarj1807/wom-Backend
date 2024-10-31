const orderManagementVendor = require('../../../../models/admin/admin-management/orderManagement/orderManagementVendorModel');
const ErrorHandler = require('../../../../utils/errorHandler');
const catchAsyncError = require('../../../../middlewares/catchAsyncError');
const APIFeatures = require('../../../../utils/apiFeatures');
 
exports.newOrderManagementVendor = catchAsyncError(async (req, res, next) => {
    try {
        const items = req.body.items ? JSON.parse(req.body.items) : [];

        const orderManageVendor = await orderManagementVendor.create({
            enquiryNumber: req.body.enquiryNumber,
            quoteNumber: req.body.quoteNumber,
            quoteDate: req.body.quoteDate,
            vendorPaidDate: req.body.vendorPaidDate,
            totalPaid: req.body.totalPaid,
            userEmail: req.body.userEmail,
            vendorEmail: req.body.vendorEmail,
            orderNumber: req.body.orderNumber,
            items: items,
            contactName: req.body.contactName,
            mobile: req.body.mobile,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            state: req.body.state,
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            orderManageVendor,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});


//get orderManagement - /api/v1/admin/orderManagement
exports.getOrderManagementVendor = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(orderManagementVendor.find(), req.query).search().filter();

    const orderManageVendor = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: orderManageVendor.length,
        orderManageVendor
    })
}

//get single orderManagement - /api/v1/admin/orderManagement/:id
const mongoose = require('mongoose');

exports.getSingleOrderManagementVendor = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return next(new ErrorHandler(`Resource not found: ${req.params.id}`, 400));
        }

        const orderManageVendor = await orderManagementVendor.findById(req.params.id);

        if (!orderManageVendor) {
            return next(new ErrorHandler('order Management not found', 404));
        }

        res.status(200).json({
            success: true,
            orderManageVendor
        });
    } catch (err) {
        next(err);
    }
};

//update orderManagement - /api/v1/admin/orderManagement/:id
exports.updateOrderManagementVendor = async (req, res, next) => {
    try {
        let orderManageVendor = await orderManagementVendor.findById(req.params.id);

        if (!orderManageVendor) {
            return res.status(404).json({
                success: false,
                message: "order Management not found"
            });
        }

        orderManageVendor = await orderManagementVendor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            orderManageVendor
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getOrderManagementVendorByEmail = async(req, res, next) => {

    const email = req.params.email;
    const apiFeatures = new APIFeatures(orderManagementVendor.findOne({ vendorEmail: email }), req.query).search().filter();

    const orderManageVendor = await apiFeatures.query;
    if (!orderManageVendor) {
        return next(new ErrorHandler('OrderManagement not found', 404));
    }
    res.status(200).json({
        success: true,
        count: orderManageVendor.length,
        orderManageVendor
    })
};


// GET - Retrieve vendor quotes
exports.getOrderManagementVendorUnread = catchAsyncError(async(req, res, next) => {
    const orderManageVendor = await orderManagementVendor.find({ isRead: false });

    res.status(200).json({
        success: true,
        count: orderManageVendor.length,
        orderManageVendor,
    });
});
