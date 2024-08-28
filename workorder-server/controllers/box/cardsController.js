const Cards = require('../../models/box/cardsModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create cards - /api/v1/cards/new
exports.newCards = catchAsyncError(async (req, res, next) => {
    const cards = await Cards.create(req.body);
    res.status(201).json({
        success: true,
        cards
    })
});

//get cards - /api/v1/cards
exports.getCards = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Cards.find(), req.query).search().filter();

    const cards = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: cards.length,
        cards
    })
}
