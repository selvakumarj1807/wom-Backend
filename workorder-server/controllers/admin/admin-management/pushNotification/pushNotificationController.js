const pushNotification = require('../../../../models/admin/admin-management/pushNotification/pushNotificationModel');
const ErrorHandler = require('../../../../utils/errorHandler');
const catchAsyncError = require('../../../../middlewares/catchAsyncError');
const APIFeatures = require('../../../../utils/apiFeatures');

//create pushNotification - /api/v1/admin/pushNotification/new
exports.newPushNotification = catchAsyncError(async(req, res, next) => {
    const push = await pushNotification.create(req.body);
    res.status(201).json({
        success: true,
        push
    })
});

// Get all push notifications or filter by email
exports.getPushNotification = async(req, res, next) => {
    try {
        const { email } = req.query;
        const notifications = await pushNotification.find();

        let filteredNotifications = notifications;

        if (email) {
            filteredNotifications = notifications.filter(notification =>
                notification.email.some(emailObj => emailObj.email === email)
            );
        }

        res.status(200).json({
            success: true,
            count: filteredNotifications.length,
            push: filteredNotifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving notifications',
            error: error.message
        });
    }
};


//get single pushNotification - /api/v1/admin/pushNotification/:id
const mongoose = require('mongoose');

exports.getSinglePushNotification = async(req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return next(new ErrorHandler(`Resource not found: ${req.params.id}`, 400));
        }

        const push = await pushNotification.findById(req.params.id);

        if (!push) {
            return next(new ErrorHandler('push Notification not found', 404));
        }

        res.status(200).json({
            success: true,
            push
        });
    } catch (err) {
        next(err);
    }
};

// Backend: updateVendorEnquiries controller in Node.js
exports.updateVendorEnquiries = async(req, res, next) => {
    const { notificationId } = req.params; // Get the notification ID from the request parameters
    const { email, readStatus } = req.body; // Get email and readStatus from request body

    try {
        // Find the notification by its ID
        const notification = await pushNotification.findById(notificationId);

        // Return error if notification not found
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            });
        }

        // Ensure that email and readStatus are provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required to update readStatus',
            });
        }

        if (typeof readStatus !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'readStatus must be a boolean value',
            });
        }

        // Find the email object within the email array
        const emailIndex = notification.email.findIndex(
            (emailObj) => emailObj.email === email
        );

        // Return error if email is not found
        if (emailIndex === -1) {
            return res.status(400).json({
                success: false,
                message: `Email ${email} not found in the notification`,
            });
        }

        // Update the readStatus for the email
        notification.email[emailIndex].readStatus = readStatus;

        // Save the updated notification to the database
        await notification.save();

        // Send a success response
        res.status(200).json({
            success: true,
            message: 'Notification updated successfully',
            notification, // Optionally return the updated notification object
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: false,
            message: 'Error updating notification',
            error: error.message,
        });
    }
};