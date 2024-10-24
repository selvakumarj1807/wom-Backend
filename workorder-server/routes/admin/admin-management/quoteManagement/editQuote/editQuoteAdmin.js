const express = require('express');
const { newEditQuoteAdmin, getEditQuoteAdmin, getSingleEditQuoteAdmin, updateEditQuoteAdmin, getForwardEditQuoteAdminByEmail, downloadQuoteAttachedFile, getForwardEditQuoteAdminByQNoAndQDate, getForwardEditQuoteAdminUnread, updateForwardEditQuoteAdminUnread } = require('../../../../../controllers/admin/admin-management/quoteManagement/editQuote/editQuoteAdminController');
const router = express.Router();

const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'invoices/'); // Define the folder for storing uploaded files
    },
    filename: function(req, file, cb) {
        // Generate a unique file name using the timestamp
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route('/forwardEditQuoteAdmin/new').post(upload.single('attachedFile'), newEditQuoteAdmin);
router.route('/forwardEditQuoteAdmin').get(getEditQuoteAdmin);
router.route('/forwardEditQuoteAdmin/:id').get(getSingleEditQuoteAdmin);
router.route('/forwardEditQuoteAdmin/:id').put(updateEditQuoteAdmin);
router.route('/forwardEditQuoteAdmin/invoiceEmail/:email').get(getForwardEditQuoteAdminByEmail);
router.route('/forwardEditQuoteAdmin/download/:filename').get(downloadQuoteAttachedFile);
router.route('/forwardEditQuoteAdmin/invoiceNumber/:ino').get(getForwardEditQuoteAdminByQNoAndQDate);
router.route('/forwardEditQuoteAdminUnread').get(getForwardEditQuoteAdminUnread);
router.route('/forwardEditQuoteAdminUnread/:id').put(updateForwardEditQuoteAdminUnread);






module.exports = router;