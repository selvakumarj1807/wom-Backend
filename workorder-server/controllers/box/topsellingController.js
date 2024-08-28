const Topselling = require('../../models/box/topsellingModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create topselling - /api/v1/topselling/new
exports.newTopselling = catchAsyncError(async (req, res, next) => {
    const topselling = await Topselling.create(req.body);
    res.status(201).json({
        success: true,
        topselling
    })
});

//get topselling - /api/v1/topselling
exports.geTtopselling = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Topselling.find(), req.query).search().filter();

    const topselling = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: topselling.length,
        topselling
    })
}
