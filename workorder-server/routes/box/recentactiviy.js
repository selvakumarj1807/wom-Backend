const express = require('express');
const { newRecentactiviy, getRecentactiviy } = require('../../controllers/box/recentactiviyController');
const router = express.Router();

router.route('/recentactiviy/new').post(newRecentactiviy);
router.route('/recentactiviy').get(getRecentactiviy);

module.exports = router;