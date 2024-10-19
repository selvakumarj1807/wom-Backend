const express = require('express');
const { newEnquiry, getEnquiry, getUnreadEnquiries, updateEnquiries, getEnquiryNumber, getUserEnquiryByEmail } = require('../../controllers/user/enquiryController');
const router = express.Router();

router.route('/enquiry/new').post(newEnquiry);
router.route('/enquiry').get(getEnquiry);
router.route('/enquiry/unread').get(getUnreadEnquiries);
router.route('/enquiry/:id').put(updateEnquiries);
router.route('/enquiry/enquiryNumber/:id').get(getEnquiryNumber);
router.route('/enquiry/:email').get(getUserEnquiryByEmail);



module.exports = router;