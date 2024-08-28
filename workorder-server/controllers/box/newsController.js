const News = require('../../models/box/newsModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create news - /api/v1/news/new
exports.newNews = catchAsyncError(async (req, res, next) => {
    const news = await News.create(req.body);
    res.status(201).json({
        success: true,
        news
    })
});

//get news - /api/v1/news
exports.getNews = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(News.find(), req.query).search().filter();

    const news = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: news.length,
        news
    })
}
