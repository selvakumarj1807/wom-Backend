const express = require('express');
const { newCards, getCards } = require('../../controllers/box/cardsController');
const router = express.Router();

router.route('/cards/new').post(newCards);
router.route('/cards').get(getCards);

module.exports = router;