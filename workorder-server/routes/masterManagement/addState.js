const express = require('express');
const { getAddState, newAddState, updateAddState, deleteAddState } = require('../../controllers/masterManagement/addStateController');
const router = express.Router();

router.route('/addState').get(getAddState);
router.route('/addState/new').post(newAddState);
router.route('/addState/:id').put(updateAddState);
router.route('/addState/:id').delete(deleteAddState);

module.exports = router;