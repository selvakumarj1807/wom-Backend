const express = require('express');
const { newTopselling, geTtopselling } = require('../../controllers/box/topsellingController');
const router = express.Router();

router.route('/topselling/new').post(newTopselling);
router.route('/topselling').get(geTtopselling);

module.exports = router;