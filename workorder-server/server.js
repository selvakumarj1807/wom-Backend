const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, "config/config.env") });
connectDatabase();

// Use the main `app` instance from './app'
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tited001@gmail.com', // Sender email address and app password // selvakumarj1807@gmail.com // bffnoatyszeuclqx
        pass: 'ktbogvskgvpvfbvy' // Sender email address and app password  //tited001@gmail.com// ktbogvskgvpvfbvy
    }
});

// Email route
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'selvakumarj1807@gmail.com',
        to,
        subject,
        text,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.status(500).send({ message: 'Error sending email', error });
        } else {
            res.status(200).send({ message: 'Email sent successfully' });
        }
    });
});

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to unhandledRejection');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to uncaughtException');
    server.close(() => {
        process.exit(1);
    });
});