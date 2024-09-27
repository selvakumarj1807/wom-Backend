const AddCategory = require('../../models/masterManagement/addCategoryModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddCategory = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddCategory.find(), req.query).search().filter();

    const addCategory = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addCategory.length,
        addCategory
    })
}

//create product - /api/v1/product/new
exports.newAddCategory = catchAsyncError(async(req, res, next) => {
    const addCategory = await AddCategory.create(req.body);
    res.status(201).json({
        success: true,
        addCategory
    })
});


//update product - /api/v1/product/:id
exports.updateAddCategory = async(req, res, next) => {
    try {
        let addCategory = await AddCategory.findById(req.params.id);

        if (!addCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        addCategory = await AddCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addCategory
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddCategory = async(req, res, next) => {
    try {
        const addCategory = await AddCategory.findByIdAndDelete(req.params.id);

        if (!addCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}