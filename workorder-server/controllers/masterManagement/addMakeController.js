const AddMake = require('../../models/masterManagement/addMakeModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddMake = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddMake.find(), req.query).search().filter();

    const addMake = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addMake.length,
        addMake
    })
}

//create product - /api/v1/product/new
exports.newAddMake = catchAsyncError(async(req, res, next) => {
    const addMake = await AddMake.create(req.body);
    res.status(201).json({
        success: true,
        addMake
    })
});


//update product - /api/v1/product/:id
exports.updateAddMake = async(req, res, next) => {
    try {
        let addMake = await AddMake.findById(req.params.id);

        if (!addMake) {
            return res.status(404).json({
                success: false,
                message: "Make not found"
            });
        }

        addMake = await AddMake.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addMake
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddMake = async(req, res, next) => {
    try {
        const addMake = await AddMake.findByIdAndDelete(req.params.id);

        if (!addMake) {
            return res.status(404).json({
                success: false,
                message: "Make not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Make Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}