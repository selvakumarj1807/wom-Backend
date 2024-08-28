const catchAsyncError = require('../../middlewares/catchAsyncError');
const User = require('../../models/user/userModel');
const ErrorHandler = require('../../utils/errorHandler');
const sendToken = require('../../utils/jwt')

//Register user
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        sendToken(user, 201, res);
    } catch (error) {
        if (error.code === 11000) {
            return next(new ErrorHandler('Email already exists', 400));
        }
        return next(new ErrorHandler('An error occurred during registration', 500));
    }
});


//Login user
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //finding the user database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid email or password ', 401));
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 201, res);

})

// Logout User
exports.logoutUser = (req, res, next) => {
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