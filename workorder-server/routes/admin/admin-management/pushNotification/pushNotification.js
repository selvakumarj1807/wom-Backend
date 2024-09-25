const express = require('express');
const { newPushNotification, getPushNotification, getSinglePushNotification, updateVendorEnquiries } = require('../../../../controllers/admin/admin-management/pushNotification/pushNotificationController');
const router = express.Router();

router.route('/pushNotification/new').post(newPushNotification);
router.route('/pushNotification').get(getPushNotification);
router.route('/pushNotification/:id').get(getSinglePushNotification);
router.route('/pushNotification/:notificationId').put(updateVendorEnquiries);

module.exports = router;