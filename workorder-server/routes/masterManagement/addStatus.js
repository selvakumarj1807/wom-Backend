const express = require('express');
const { getAddStatus, newAddStatus, updateAddStatus, deleteAddStatus } = require('../../controllers/masterManagement/addStatusController');
const router = express.Router();

router.route('/addStatus').get(getAddStatus);
router.route('/addStatus/new').post(newAddStatus);
router.route('/addStatus/:id').put(updateAddStatus);
router.route('/addStatus/:id').delete(deleteAddStatus);

module.exports = router;