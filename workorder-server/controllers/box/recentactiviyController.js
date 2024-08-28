const Recentactiviy = require('../../models/box/recentactiviyModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create recentactiviy - /api/v1/recentactiviy/new
exports.newRecentactiviy = catchAsyncError(async (req, res, next) => {
    const recentactiviy = await Recentactiviy.create(req.body);
    res.status(201).json({
        success: true,
        recentactiviy
    })
});

//get recentactiviy - /api/v1/recentactiviy
exports.getRecentactiviy = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Recentactiviy.find(), req.query).search().filter();

    const recentactiviy = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: recentactiviy.length,
        recentactiviy
    })
}
