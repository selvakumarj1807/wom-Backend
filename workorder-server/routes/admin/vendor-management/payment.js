const express = require('express');
const { newPayment } = require('../../../controllers/admin/vendor-management/paymentController');
const router = express.Router();

router.route('/payment/new').post(newPayment);

module.exports = router;