const nodemailer = require('nodemailer');
require('dotenv').config();
console.log(process.env.EMAIL_ADDRESS,process.env.EMAIL_PASSWORD)
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.EMAIL_PASSWORD
    }
});
module.exports = transport