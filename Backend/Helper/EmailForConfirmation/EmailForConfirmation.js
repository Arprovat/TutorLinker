const transport = require("../../Config/Mail_config/Mail_config");

const sendConfirmationEmail = async (user, token) => {
    const confirmationUrl = `${process.env.FRONTEND_URL}/api/confirm/${token}`;

    const mailOptions = {
        from: `"TutorLinker" <${process.env.EMAIL_ADDRESS}>`,
        to: user.email,
        subject: "Confirm Your Account - TutorConnect",
        html: `
            <h2>Hello ${user.name},</h2>
            <p>Thank you for registering on TutorConnect. Please confirm your account by clicking the button below:</p>
            <a href="${confirmationUrl}" 
               style="display: inline-block; padding: 10px 20px; font-size: 16px; 
                      color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
               Confirm Account
            </a>
            <p>If you didn't register, please ignore this email.</p>
        `,
    };

    try {
        await transport.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${user.email}`);
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
};

module.exports = sendConfirmationEmail;
