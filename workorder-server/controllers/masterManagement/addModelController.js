const AddModel = require('../../models/masterManagement/addModelModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddModel = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddModel.find(), req.query).search().filter();

    const addModel = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addModel.length,
        addModel
    })
}

//create product - /api/v1/product/new
exports.newAddModel = catchAsyncError(async(req, res, next) => {
    const addModel = await AddModel.create(req.body);
    res.status(201).json({
        success: true,
        addModel
    })
});


//update product - /api/v1/product/:id
exports.updateAddModel = async(req, res, next) => {
    try {
        let addModel = await AddModel.findById(req.params.id);

        if (!addModel) {
            return res.status(404).json({
                success: false,
                message: "Model not found"
            });
        }

        addModel = await AddModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addModel
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddModel = async(req, res, next) => {
    try {
        const addModel = await AddModel.findByIdAndDelete(req.params.id);

        if (!addModel) {
            return res.status(404).json({
                success: false,
                message: "Model not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Model Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}