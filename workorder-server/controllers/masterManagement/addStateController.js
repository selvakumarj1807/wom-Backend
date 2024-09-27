const AddState = require('../../models/masterManagement/addStateModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddState = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddState.find(), req.query).search().filter();

    const addState = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addState.length,
        addState
    })
}

//create product - /api/v1/product/new
exports.newAddState = catchAsyncError(async(req, res, next) => {
    const addState = await AddState.create(req.body);
    res.status(201).json({
        success: true,
        addState
    })
});


//update product - /api/v1/product/:id
exports.updateAddState = async(req, res, next) => {
    try {
        let addState = await AddState.findById(req.params.id);

        if (!addState) {
            return res.status(404).json({
                success: false,
                message: "State not found"
            });
        }

        addState = await AddState.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addState
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddState = async(req, res, next) => {
    try {
        const addState = await AddState.findByIdAndDelete(req.params.id);

        if (!addState) {
            return res.status(404).json({
                success: false,
                message: "State not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "State Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}