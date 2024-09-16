const express = require('express');
const { getAddShippingMethod, newAddShippingMethod, updateAddShippingMethod, deleteAddShippingMethod } = require('../../controllers/masterManagement/addShippingMethodController');
const router = express.Router();

router.route('/addShippingMethod').get(getAddShippingMethod);
router.route('/addShippingMethod/new').post(newAddShippingMethod);
router.route('/addShippingMethod/:id').put(updateAddShippingMethod);
router.route('/addShippingMethod/:id').delete(deleteAddShippingMethod);

module.exports = router;