const AddYear = require('../../models/masterManagement/addYearModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddYear = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddYear.find(), req.query).search().filter();

    const addYear = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addYear.length,
        addYear
    })
}

//create product - /api/v1/product/new
exports.newAddYear = catchAsyncError(async(req, res, next) => {
    const addYear = await AddYear.create(req.body);
    res.status(201).json({
        success: true,
        addYear
    })
});


//update product - /api/v1/product/:id
exports.updateAddYear = async(req, res, next) => {
    try {
        let addYear = await AddYear.findById(req.params.id);

        if (!addYear) {
            return res.status(404).json({
                success: false,
                message: "Year not found"
            });
        }

        addYear = await AddYear.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addYear
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddYear = async(req, res, next) => {
    try {
        const addYear = await AddYear.findByIdAndDelete(req.params.id);

        if (!addYear) {
            return res.status(404).json({
                success: false,
                message: "Year not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Year Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}