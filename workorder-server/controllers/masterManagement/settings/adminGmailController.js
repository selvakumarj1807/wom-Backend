const AdminGmail = require('../../../models/masterManagement/settings/adminGmailModel');
const catchAsyncError = require('../../../middlewares/catchAsyncError');
const APIFeatures = require('../../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAdminGmail = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AdminGmail.find(), req.query).search().filter();

    const adminGmail = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: adminGmail.length,
        adminGmail
    })
}

//create product - /api/v1/product/new
exports.newAdminGmail = catchAsyncError(async(req, res, next) => {
    const adminGmail = await AdminGmail.create(req.body);
    res.status(201).json({
        success: true,
        adminGmail
    })
});


//update product - /api/v1/product/:id
exports.updateAdminGmail = async(req, res, next) => {
    try {
        let adminGmail = await AdminGmail.findById(req.params.id);

        if (!adminGmail) {
            return res.status(404).json({
                success: false,
                message: "adminGmail not found"
            });
        }

        adminGmail = await AdminGmail.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            adminGmail
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAdminGmail = async(req, res, next) => {
    try {
        const adminGmail = await AdminGmail.findByIdAndDelete(req.params.id);

        if (!adminGmail) {
            return res.status(404).json({
                success: false,
                message: "adminGmail not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "adminGmail Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}