const Notification_Model = require("../../Models/Notification/Notification_Model");

const getAllNotification = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification_Model.aggregate([
            {
                $match: {
                    recipientId: userId
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'senderId',
                    foreignField: '_id',
                    as: 'sender'
                }
            },
            {
                $lookup: {
                    from: 'profile_models',
                    localField: 'senderId',
                    foreignField: 'AccId',
                    as: 'profile'
                }
            },
            {
                $unwind: {
                    path: '$sender',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$profile',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    username: '$sender.username',
                    profile_photo: '$profile.profile_pic',
                    message: 1,
                    createdAt: 1
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        console.log("notify", notifications)
        if (notifications.length === 0) {
            return res.status(200).json({ message: "No notifications found", data: [] });
        }
        return res.status(200).json({ message: "Notifications retrieved successfully", Data: notifications });

    } catch (error) {
        console.error("Error in getAllNotification:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getAllNotification;
