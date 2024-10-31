const express = require('express');
const { newOrderManagementVendor, getOrderManagementVendor, getSingleOrderManagementVendor, updateOrderManagementVendor, getOrderManagementVendorByEmail, getOrderManagementVendorUnread } = require('../../../../controllers/admin/admin-management/orderManagement/orderManagementVendorController');
const router = express.Router();
const multer = require('multer'); // Use multer for parsing multipart/form-data

router.route('/orderManagementVendor/new').post(multer().none(), newOrderManagementVendor);
router.route('/orderManagementVendor').get(getOrderManagementVendor);
router.route('/orderManagementVendor/:id').get(getSingleOrderManagementVendor);
router.route('/orderManagementVendor/:id').put(updateOrderManagementVendor);
router.route('/orderManagementVendor/orderByEmail/:email').get(getOrderManagementVendorByEmail);
router.route('/orderManagementVendor').get(getOrderManagementVendorUnread);

 
module.exports = router;