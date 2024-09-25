const express = require('express');
const { registerVendor, logoutVendor } = require('../../controllers/vendor/authController');
const { loginVendor, getVendor } = require('../../controllers/vendor/authController')
const router = express.Router();

router.route('/register').post(registerVendor);
router.route('/login').post(loginVendor);
router.route('/logout').get(logoutVendor);
router.route('/vendorDetails').get(getVendor);

module.exports = router;