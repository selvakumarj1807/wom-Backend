const express = require('express');
const router = express.Router();
const { newVendorDetail, getVendorDetails, updateVendorDetail, getSingleVendorDetailByEmail } = require('../../controllers/vendor/vendorDetailController');

router.route('/vendorRegDetails').get(getVendorDetails);
router.route('/vendorDetail/new').post(newVendorDetail);
router.route('/vendorDetail/:id').put(updateVendorDetail);
router.route('/vendorRegDetails/:email').get(getSingleVendorDetailByEmail);

module.exports = router;