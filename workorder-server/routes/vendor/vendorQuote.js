const express = require('express');
const multer = require('multer');
const path = require('path');
const { newVendorQuote, getVendorQuote, downloadAttachedFile, getVendorQuoteByEmail, getUnreadVendorQuote, updateVendorQuote } = require('../../controllers/vendor/vendorQuoteController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Define the folder for storing uploaded files
    },
    filename: function(req, file, cb) {
        // Generate a unique file name using the timestamp
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Define routes with multer middleware
router.route('/vendorQuote/new').post(upload.single('attachedFile'), newVendorQuote);
router.route('/vendorQuote').get(getVendorQuote);
router.route('/vendorQuote/download/:filename').get(downloadAttachedFile);
router.route('/vendorQuote/:email').get(getVendorQuoteByEmail);
router.route('/vendorQuoteunread').get(getUnreadVendorQuote);
router.route('/vendorQuote/:id').put(updateVendorQuote);


module.exports = router;