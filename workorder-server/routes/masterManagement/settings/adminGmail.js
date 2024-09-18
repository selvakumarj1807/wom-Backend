const express = require('express');
const { getAdminGmail, newAdminGmail, updateAdminGmail, deleteAdminGmail } = require('../../../controllers/masterManagement/settings/adminGmailController');
const router = express.Router();

router.route('/adminGmail').get(getAdminGmail);
router.route('/adminGmail/new').post(newAdminGmail);
router.route('/adminGmail/:id').put(updateAdminGmail);
router.route('/adminGmail/:id').delete(deleteAdminGmail);

module.exports = router;