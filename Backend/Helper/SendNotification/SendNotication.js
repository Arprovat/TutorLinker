const Notification_Model = require("../../Models/Notification/Notification_Model");

const SendNotification = async (senderId, receiverId, message, type) => {
    try {
        const notifyUser = {
            senderId,
            recipientId:receiverId,
            message,
            type
        };

        if (!senderId || !receiverId || !message || !type) {
            throw new Error('Missing required notification fields');
        }

        const result = await Notification_Model.create(notifyUser);
        return result;
    } catch (error) {
        console.error('Notification error:', error);
        throw new Error(`Notification failed: ${error.message}`);
    }
};

module.exports = SendNotification;