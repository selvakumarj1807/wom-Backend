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
app.use(express.static(path.join(__dirname, "js")));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// admin - admin-management

const rolesAdmin = require('./routes/admin/admin-management/accessManagement/roles')
const permissionAdmin = require('./routes/admin/admin-management/accessManagement/permission')
const pushNotification = require('./routes/admin/admin-management/pushNotification/pushNotification')
const forwardEditQuoteAdmin = require('./routes/admin/admin-management/quoteManagement/editQuote/editQuoteAdmin')
const orderManagement = require('./routes/admin/admin-management/orderManagement/orderManagement')
const orderManagementVendor = require('./routes/admin/admin-management/orderManagement/orderManagementVendor')
const deliveryManagementUser = require('./routes/admin/admin-management/deliveryManagement/user/deliveryManagementUser')
const businessSetup = require('./routes/admin/admin-management/configurationSettings/businessSetup')
const paymentMethod = require('./routes/admin/admin-management/configurationSettings/paymentMethod')
const socialMedia = require('./routes/admin/admin-management/configurationSettings/socialMedia')
const mailConfiguration = require('./routes/admin/admin-management/configurationSettings/mailConfiguration')


app.use('/api/v1/admin', rolesAdmin);
app.use('/api/v1/admin', permissionAdmin);
app.use('/api/v1/admin', pushNotification);
app.use('/api/v1/admin', forwardEditQuoteAdmin);
app.use('/api/v1/admin', orderManagement);
app.use('/api/v1/admin', orderManagementVendor);
app.use('/api/v1/admin', deliveryManagementUser);
app.use('/api/v1/admin', businessSetup);
app.use('/api/v1/admin', paymentMethod);
app.use('/api/v1/admin', socialMedia);
app.use('/api/v1/admin', mailConfiguration);

//admin - admin-auth

const auth = require('./routes/admin/admin-auth/auth')

app.use('/api/v1/admin', auth);

//vendor

const productsVendor = require('./routes/vendor/product');
const authVendor = require('./routes/vendor/auth')
const vendorDetailVendor = require('./routes/vendor/vendorDetail')
const vendorQuote = require('./routes/vendor/vendorQuote')


app.use('/api/v1/vendor', productsVendor);
app.use('/api/v1/vendor', authVendor);
app.use('/api/v1/vendor', vendorDetailVendor);
app.use('/api/v1/vendor', vendorQuote);



//user

const enquiry = require('./routes/user/enquiry')
const authUser = require('./routes/user/auth')
const quote = require('./routes/user/quote')

app.use('/api/v1/user', enquiry);
app.use('/api/v1/user', authUser);
app.use('/api/v1/user', quote);

//box

const cards = require('./routes/box/cards')
const news = require('./routes/box/news')
const topselling = require('./routes/box/topselling')
const recentsales = require('./routes/box/recentsales')
const recentactiviy = require('./routes/box/recentactiviy')


app.use('/api/v1/box', cards);
app.use('/api/v1/box', news);
app.use('/api/v1/box', topselling);
app.use('/api/v1/box', recentsales);
app.use('/api/v1/box', recentactiviy);

//Master Management

const addYear = require('./routes/masterManagement/addYear')
const addMake = require('./routes/masterManagement/addMake')
const addModel = require('./routes/masterManagement/addModel')
const addShippingMethod = require('./routes/masterManagement/addShippingMethod')
const addState = require('./routes/masterManagement/addState')
const addStatus = require('./routes/masterManagement/addStatus')
const addCategory = require('./routes/masterManagement/addCategory')


app.use('/api/v1/masterManagement', addYear);
app.use('/api/v1/masterManagement', addMake);
app.use('/api/v1/masterManagement', addModel);
app.use('/api/v1/masterManagement', addShippingMethod);
app.use('/api/v1/masterManagement', addState);
app.use('/api/v1/masterManagement', addStatus);
app.use('/api/v1/masterManagement', addCategory);


const adminGmail = require('./routes/masterManagement/settings/adminGmail')

app.use('/api/v1/masterManagement', adminGmail);


app.use(errorMiddleware);

module.exports = app;