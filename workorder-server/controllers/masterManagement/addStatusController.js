const AddStatus = require('../../models/masterManagement/addStatusModel');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const APIFeatures = require('../../utils/apiFeatures');


//get products - /api/v1/products
exports.getAddStatus = async(req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(AddStatus.find(), req.query).search().filter();

    const addstatus = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: addstatus.length,
        addstatus
    })
}

//create product - /api/v1/product/new
exports.newAddStatus = catchAsyncError(async(req, res, next) => {
    const addstatus = await AddStatus.create(req.body);
    res.status(201).json({
        success: true,
        addstatus
    })
});


//update product - /api/v1/product/:id
exports.updateAddStatus = async(req, res, next) => {
    try {
        let addstatus = await AddStatus.findById(req.params.id);

        if (!addstatus) {
            return res.status(404).json({
                success: false,
                message: "Status not found"
            });
        }

        addstatus = await AddStatus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            addstatus
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// delete product - /api/v1/product/:id
exports.deleteAddStatus = async(req, res, next) => {
    try {
        const addstatus = await AddStatus.findByIdAndDelete(req.params.id);

        if (!addstatus) {
            return res.status(404).json({
                success: false,
                message: "Status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}