const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const nodemailer = require('nodemailer');

console.log("-----------------------------------------");
console.log("Testing Email Credentials...");
if (process.env.EMAIL_PASS) {
    console.log("✅ Password Found: " + process.env.EMAIL_PASS.substring(0, 3) + "...");
} else {
    console.log("❌ ERROR: Password is still undefined. Check .env file location!");
}
console.log("-----------------------------------------");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Test Email from Portfolio',
    text: 'If you see this, your email system is working perfectly!'
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log("❌ EMAIL FAILED TO SEND!");
        console.log("Error Message:", error.message);
        if(error.response) console.log("Google Response:", error.response);
    } else {
        console.log("✅ EMAIL SENT SUCCESSFULLY! Check your inbox.");
    }
});