const express = require('express');
const { newOrderManagement, getOrderManagement, getSingleOrderManagement, updateOrderManagement, getOrderManagementByEmail, getorderManagementUnread } = require('../../../../controllers/admin/admin-management/orderManagement/orderManagementController');
const router = express.Router();
const multer = require('multer'); // Use multer for parsing multipart/form-data

router.route('/orderManagement/new').post(multer().none(), newOrderManagement);
router.route('/orderManagement').get(getOrderManagement);
router.route('/orderManagement/:id').get(getSingleOrderManagement);
router.route('/orderManagement/:id').put(updateOrderManagement);
router.route('/orderManagement/orderByEmail/:email').get(getOrderManagementByEmail);
router.route('/orderManagementUnread').get(getorderManagementUnread);
//router.route('/orderManagementUnread/:id').put(updateorderManagementUnread);

 
module.exports = router;