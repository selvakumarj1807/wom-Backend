const express = require('express');
const { getAddCategory, newAddCategory, updateAddCategory, deleteAddCategory } = require('../../controllers/masterManagement/addCategoryController');
const router = express.Router();

router.route('/addCategory').get(getAddCategory);
router.route('/addCategory/new').post(newAddCategory);
router.route('/addCategory/:id').put(updateAddCategory);
router.route('/addCategory/:id').delete(deleteAddCategory);

module.exports = router;