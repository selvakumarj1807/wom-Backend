const Recentsales = require('../../models/box/recentsalesModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create recentsales - /api/v1/recentsales/new
exports.newRecentsales = catchAsyncError(async (req, res, next) => {
    const recentsales = await Recentsales.create(req.body);
    res.status(201).json({
        success: true,
        recentsales
    })
});

//get recentsales - /api/v1/recentsales
exports.geTRecentsales = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Recentsales.find(), req.query).search().filter();

    const recentsales = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: recentsales.length,
        recentsales
    })
}
