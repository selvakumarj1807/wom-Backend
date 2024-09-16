const express = require('express');
const { getAddModel, newAddModel, updateAddModel, deleteAddModel } = require('../../controllers/masterManagement/addModelController');
const router = express.Router();

router.route('/addModel').get(getAddModel);
router.route('/addModel/new').post(newAddModel);
router.route('/addModel/:id').put(updateAddModel);
router.route('/addModel/:id').delete(deleteAddModel);

module.exports = router;