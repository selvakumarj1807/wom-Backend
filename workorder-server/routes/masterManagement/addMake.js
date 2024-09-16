const express = require('express');
const { getAddMake, newAddMake, updateAddMake, deleteAddMake } = require('../../controllers/masterManagement/addMakeController');
const router = express.Router();

router.route('/addMake').get(getAddMake);
router.route('/addMake/new').post(newAddMake);
router.route('/addMake/:id').put(updateAddMake);
router.route('/addMake/:id').delete(deleteAddMake);

module.exports = router;