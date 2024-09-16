const AddShippingMethod = require('../../models/masterManagement/addShippingMethodModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddShippingMethod = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddShippingMethod.find(), req.query).search().filter();

    const addShippingMethod = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addShippingMethod.length,
        addShippingMethod
    })
}

//create product - /api/v1/product/new
exports.newAddShippingMethod = catchAsyncError(async(req, res, next) => {
    const addShippingMethod = await AddShippingMethod.create(req.body);
    res.status(201).json({
        success: true,
        addShippingMethod
    })
});


//update product - /api/v1/product/:id
exports.updateAddShippingMethod = async(req, res, next) => {
    try {
        let addShippingMethod = await AddShippingMethod.findById(req.params.id);

        if (!addShippingMethod) {
            return res.status(404).json({
                success: false,
                message: "AddShippingMethod not found"
            });
        }

        addShippingMethod = await AddShippingMethod.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addShippingMethod
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddShippingMethod = async(req, res, next) => {
    try {
        const addShippingMethod = await AddShippingMethod.findByIdAndDelete(req.params.id);

        if (!addShippingMethod) {
            return res.status(404).json({
                success: false,
                message: "ShippingMethod not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "ShippingMethod Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}