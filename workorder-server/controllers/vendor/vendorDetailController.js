
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');
const VendorDetail = require("../../models/vendor/vendorDetailModel")

const mongoose = require('mongoose');
//get vendorDetail - /api/v1/vendorDetails
exports.getVendorDetails = async (req, res, next) => {
     const apiFeatures = new APIFeatures(VendorDetail.find(), req.query).search().filter();
    const vendorDetails = await apiFeatures.query;
    res.status(200).json({
        success: true,
        vendorDetails
    })
}


//create vendorDetail - /api/v1/vendorDetail/new
exports.newVendorDetail = catchAsyncError(async(req,res,next) => {
   const vendorDetail = await VendorDetail.create(req.body);
   res.status(201).json({
    success: true,
    vendorDetail
   })

})


//update vendorDetail - /api/v1/vendorDetail/:id
exports.updateVendorDetail = async (req, res, next) => {
    try {
        let vendorDetail = await VendorDetail.findById(req.params.id);

        if (!vendorDetail) {
            return res.status(404).json({
                success: false,
                message: "vendorDetail not found"
            });
        }

        vendorDetail = await VendorDetail.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            vendorDetail
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

