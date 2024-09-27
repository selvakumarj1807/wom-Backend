const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getProductsByEmail } = require('../../controllers/vendor/productController');
const router = express.Router();
//const { isAuthenticateVendor, authorizeRoles } = require('../../middlewares/authenticate')

router.route('/products').get(getProducts);
//router.route('/product/new').post(isAuthenticateVender,authorizeRoles('admin'),newProduct);
router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/products/:email').get(getProductsByEmail);


module.exports = router;