const Enquiry = require('../../models/user/enquiryModel')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');

//create tracking - /api/v1/tracking/new
exports.newEnquiry = catchAsyncError(async(req, res, next) => {
    const enquiry = await Enquiry.create(req.body);
    //console.log(req.body)
    res.status(201).json({
        success: true,
        enquiry
    });

    res.status(201).json({ message: 'Enquiry created', enquiryNumber: newEnquiry.enquiryNumber });

});

//get tracking - /api/v1/tracking
exports.getEnquiry = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Enquiry.find(), req.query).search().filter();

    const enquiry = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: enquiry.length,
        enquiry
    })
}

// In your controller or route handler
exports.getUnreadEnquiries = async(req, res, next) => {
    try {
        // Assuming 'isRead' is a boolean field indicating read/unread status
        const unreadEnquiries = await Enquiry.find({ isRead: false });

        res.status(200).json({
            success: true,
            count: unreadEnquiries.length,
            enquiry: unreadEnquiries
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};


//update product - /api/v1/product/:id
exports.updateEnquiries = async(req, res, next) => {
    try {
        let enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "enquiry not found"
            });
        }

        enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            enquiry
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getEnquiryNumber = async(req, res, next) => {

    const enquiryNumber = req.params.id;
    const apiFeatures = new APIFeatures(Enquiry.findOne({ enquiryNumber: enquiryNumber }), req.query).search().filter();

    const enquiry = await apiFeatures.query;
    if (!enquiry) {
        return next(new ErrorHandler('Enquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        count: enquiry.length,
        enquiry
    })
};

exports.getUserEnquiryByEmail = async(req, res, next) => {

    const email = req.params.email;
    const apiFeatures = new APIFeatures(Enquiry.findOne({ email: email }), req.query).search().filter();

    const enquiry = await apiFeatures.query;
    if (!enquiry) {
        return next(new ErrorHandler('Enquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        count: enquiry.length,
        enquiry
    })
};

