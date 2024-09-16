const express = require('express');
const { getAddYear, newAddYear, updateAddYear, deleteAddYear } = require('../../controllers/masterManagement/addYearController');
const router = express.Router();

router.route('/addYear').get(getAddYear);
router.route('/addYear/new').post(newAddYear);
router.route('/addYear/:id').put(updateAddYear);
router.route('/addYear/:id').delete(deleteAddYear);

module.exports = router;