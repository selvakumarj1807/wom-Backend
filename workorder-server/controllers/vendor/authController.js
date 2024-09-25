const catchAsyncError = require('../../middlewares/catchAsyncError');
const Vendor = require('../../models/vendor/vendorModel');
const ErrorHandler = require('../../utils/errorHandler');
const sendToken = require('../../utils/jwt')
const APIFeatures = require('../../utils/apiFeatures');


//Register user
exports.registerVendor = catchAsyncError(async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const vendor = await Vendor.create({
            name,
            email,
            password
        });

        sendToken(vendor, 201, res);
    } catch (error) {
        if (error.code === 11000) {
            return next(new ErrorHandler('Email already exists', 400));
        }
        return next(new ErrorHandler('An error occurred during registration', 500));
    }
});

//Login vendor
exports.loginVendor = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //finding the vendor database
    const vendor = await Vendor.findOne({ email }).select('+password')

    if (!vendor) {
        return next(new ErrorHandler('Invalid email or password ', 401));
    }

    if (!await vendor.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(vendor, 201, res);

})

// Logout User
exports.logoutVendor = (req, res, next) => {
    res.cookie('token', null, {
            expires: new Date(Date.now()), // Expire the cookie immediately
            httpOnly: true, // Prevent client-side scripts from accessing the cookie
            sameSite: 'Strict', // Protect against CSRF attacks
            secure: process.env.NODE_ENV === 'production' // Ensure cookie is only sent over HTTPS in production
        })
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully"
        });
};

//get tracking - /api/v1/tracking
exports.getVendor = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Vendor.find(), req.query).search().filter();

    const vendor = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: vendor.length,
        vendor
    })
}