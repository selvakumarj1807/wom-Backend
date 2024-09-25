const express = require('express');
const { registerUser, logoutUser } = require('../../controllers/user/authController');
const { loginUser, getUser } = require('../../controllers/user/authController')
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/userDetails').get(getUser);

module.exports = router;