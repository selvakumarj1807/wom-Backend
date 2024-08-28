const express = require('express');
const { newNews, getNews } = require('../../controllers/box/newsController');
const router = express.Router();

router.route('/news/new').post(newNews);
router.route('/news').get(getNews);

module.exports = router;