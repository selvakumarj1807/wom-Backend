const orderManagement = require('../../../../models/admin/admin-management/orderManagement/orderManagementModel');
const ErrorHandler = require('../../../../utils/errorHandler');
const catchAsyncError = require('../../../../middlewares/catchAsyncError');
const APIFeatures = require('../../../../utils/apiFeatures');
 
exports.newOrderManagement = catchAsyncError(async (req, res, next) => {
    try {
        const items = req.body.items ? JSON.parse(req.body.items) : [];

        const orderManage = await orderManagement.create({
            invoiceNumber: req.body.invoiceNumber,
            enquiryNumber: req.body.enquiryNumber,
            quoteNumber: req.body.quoteNumber,
            quoteDate: req.body.quoteDate,
            forwordDate: req.body.forwordDate,
            totalPaid: req.body.totalPaid,
            email: req.body.email,
            orderDate: req.body.orderDate,
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
            orderManage,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});


//get orderManagement - /api/v1/admin/orderManagement
exports.getOrderManagement = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(orderManagement.find(), req.query).search().filter();

    const orderManage = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: orderManage.length,
        orderManage
    })
}

//get single orderManagement - /api/v1/admin/orderManagement/:id
const mongoose = require('mongoose');

exports.getSingleOrderManagement = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return next(new ErrorHandler(`Resource not found: ${req.params.id}`, 400));
        }

        const orderManage = await orderManagement.findById(req.params.id);

        if (!orderManage) {
            return next(new ErrorHandler('order Management not found', 404));
        }

        res.status(200).json({
            success: true,
            orderManage
        });
    } catch (err) {
        next(err);
    }
};

//update orderManagement - /api/v1/admin/orderManagement/:id
exports.updateOrderManagement = async (req, res, next) => {
    try {
        let orderManage = await orderManagement.findById(req.params.id);

        if (!orderManage) {
            return res.status(404).json({
                success: false,
                message: "order Management not found"
            });
        }

        orderManage = await orderManagement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            orderManage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getOrderManagementByEmail = async(req, res, next) => {

    const email = req.params.email;
    const apiFeatures = new APIFeatures(orderManagement.findOne({ email: email }), req.query).search().filter();

    const orderManage = await apiFeatures.query;
    if (!orderManage) {
        return next(new ErrorHandler('OrderManagement not found', 404));
    }
    res.status(200).json({
        success: true,
        count: orderManage.length,
        orderManage
    })
};


// GET - Retrieve vendor quotes
exports.getorderManagementUnread = catchAsyncError(async(req, res, next) => {
    const orderManage = await orderManagement.find({ isRead: false });

    res.status(200).json({
        success: true,
        count: orderManage.length,
        orderManage,
    });
});
