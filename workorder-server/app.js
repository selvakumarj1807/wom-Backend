const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require("path");



app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"js")));

// admin - vendor-management

const acknowledgementAdminVendor = require('./routes/admin/vendor-management/acknowledgement')
const statusAdminVendor = require('./routes/admin/vendor-management/status')
const historyAdminVendor = require('./routes/admin/vendor-management/history')
const invoiceAdminVendor = require('./routes/admin/vendor-management/invoice')
const paymentAdminVendor = require('./routes/admin/vendor-management/payment')
const paymentHistoryAdminVendor = require('./routes/admin/vendor-management/paymentHistory')
const productDeliveryHistoryAdminVendor = require('./routes/admin/vendor-management/productDeliveryHistory')


app.use('/api/v1/admin/vendor', acknowledgementAdminVendor);
app.use('/api/v1/admin/vendor', statusAdminVendor);
app.use('/api/v1/admin/vendor', historyAdminVendor);
app.use('/api/v1/admin/vendor', invoiceAdminVendor);
app.use('/api/v1/admin/vendor', paymentAdminVendor);
app.use('/api/v1/admin/vendor', paymentHistoryAdminVendor);
app.use('/api/v1/admin/vendor', productDeliveryHistoryAdminVendor);

// admin - user-management

const acknowledgementAdminUser = require('./routes/admin/user-management/acknowledgement')
const statusAdminUser = require('./routes/admin/user-management/status')
const historyAdmminUser = require('./routes/admin/user-management/history')
const invoiceAdminUser = require('./routes/admin/user-management/invoice')
const paymentAdminUser = require('./routes/admin/user-management/payment')
const paymentHistoryAdminUser = require('./routes/admin/user-management/paymentHistory')
const productDeliveryHistoryAdminUser = require('./routes/admin/user-management/productDeliveryHistory')


app.use('/api/v1/admin/user', acknowledgementAdminUser);
app.use('/api/v1/admin/user', statusAdminUser);
app.use('/api/v1/admin/user', historyAdmminUser);
app.use('/api/v1/admin/user', invoiceAdminUser);
app.use('/api/v1/admin/user', paymentAdminUser);
app.use('/api/v1/admin/user', paymentHistoryAdminUser);
app.use('/api/v1/admin/user', productDeliveryHistoryAdminUser);

// admin - admin-management

const rolesAdmin = require('./routes/admin/admin-management/accessManagement/roles')
const permissionAdmin = require('./routes/admin/admin-management/accessManagement/permission')
const userToAdmin = require('./routes/admin/admin-management/enquiryManagement/user/userToAdmin')
const adminToUser = require('./routes/admin/admin-management/enquiryManagement/user/adminToUser')
const adminToVendor = require('./routes/admin/admin-management/enquiryManagement/vendor/adminToVendor')
const vendorToAdmin = require('./routes/admin/admin-management/enquiryManagement/vendor/vendorToAdmin')
const pushNotification = require('./routes/admin/admin-management/pushNotification/pushNotification')
const vendorQuoteReceived = require('./routes/admin/admin-management/quoteManagement/vendorQuote/vendorQuoteReceived')
const editQuoteAdmin = require('./routes/admin/admin-management/quoteManagement/editQuote/editQuoteAdmin')
const userQuoteForward = require('./routes/admin/admin-management/quoteManagement/userQuote/userQuoteForward')
const orderManagement = require('./routes/admin/admin-management/orderManagement/orderManagement')
const deliveryManagementUser = require('./routes/admin/admin-management/deliveryManagement/user/deliveryManagementUser')
const businessSetup = require('./routes/admin/admin-management/configurationSettings/businessSetup')
const paymentMethod = require('./routes/admin/admin-management/configurationSettings/paymentMethod')
const socialMedia = require('./routes/admin/admin-management/configurationSettings/socialMedia')
const mailConfiguration = require('./routes/admin/admin-management/configurationSettings/mailConfiguration')


app.use('/api/v1/admin', rolesAdmin);
app.use('/api/v1/admin', permissionAdmin);
app.use('/api/v1/admin', userToAdmin);
app.use('/api/v1/admin', adminToUser);
app.use('/api/v1/admin', adminToVendor);
app.use('/api/v1/admin', vendorToAdmin);
app.use('/api/v1/admin', pushNotification);
app.use('/api/v1/admin', vendorQuoteReceived);
app.use('/api/v1/admin', editQuoteAdmin);
app.use('/api/v1/admin', userQuoteForward);
app.use('/api/v1/admin', orderManagement);
app.use('/api/v1/admin', deliveryManagementUser);
app.use('/api/v1/admin', businessSetup);
app.use('/api/v1/admin', paymentMethod);
app.use('/api/v1/admin', socialMedia);
app.use('/api/v1/admin', mailConfiguration);

//admin - admin-auth

const auth = require('./routes/admin/admin-auth/auth')

app.use('/api/v1/admin',auth);

//vendor

const productsVendor = require('./routes/vendor/product');
const authVendor = require('./routes/vendor/auth')
const vendorDetailVendor = require('./routes/vendor/vendorDetail')


app.use('/api/v1/vendor',productsVendor);
app.use('/api/v1/vendor',authVendor);
app.use('/api/v1/vendor', vendorDetailVendor);


//user

const enquiry = require('./routes/user/enquiry')
const authUser = require('./routes/user/auth')
const quote = require('./routes/user/quote')
const history = require('./routes/user/history')
const invoice = require('./routes/user/invoice')
const tracking = require('./routes/user/tracking')
const payment = require('./routes/user/payment')


app.use('/api/v1/user', enquiry);
app.use('/api/v1/user',authUser);
app.use('/api/v1/user', quote);
app.use('/api/v1/user', invoice);
app.use('/api/v1/user', history);
app.use('/api/v1/user', tracking);
app.use('/api/v1/user', payment);

//box

const cards = require('./routes/box/cards')
const news = require('./routes/box/news')
const topselling = require('./routes/box/topselling')
const recentsales = require('./routes/box/recentsales')
const recentactiviy = require('./routes/box/recentactiviy')


app.use('/api/v1/box', cards);
app.use('/api/v1/box',news);
app.use('/api/v1/box', topselling);
app.use('/api/v1/box', recentsales);
app.use('/api/v1/box', recentactiviy);



app.use(errorMiddleware);

module.exports = app; 