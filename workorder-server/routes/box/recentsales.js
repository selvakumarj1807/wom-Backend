const express = require('express');
const { newRecentsales, geTRecentsales } = require('../../controllers/box/recentsalesController');
const router = express.Router();

router.route('/recentsales/new').post(newRecentsales);
router.route('/recentsales').get(geTRecentsales);

module.exports = router;