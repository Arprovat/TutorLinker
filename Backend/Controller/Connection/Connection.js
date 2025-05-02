const Connected = require("../../Models/Connected/Connected")
const SendNotification = require('../../Helper/SendNotification/SendNotication')
module.exports= class Connection {
    static async getALLConnection(req, res) {
        try {
            const user = req.user._id.toString()

            const ConnectedUser = await Connected.aggregate([

                {
                    $match: {
                        $or: [{ senderId: user }, { receiverId: user }],
                        status: 'accepted'
                    }
                },
                {
                    $lookup: {
                        from: "User",
                        localField: 'senderId',
                        foreignField: '_id',
                        as: 'sender'
                    }
                }, {
                    $lookup: {
                        from: 'User',
                        localField: 'receiverId',
                        foreignField: '_id',
                        as: 'receiver'
                    }
                },
                { $unwind: 'sender' },
                { $unwind: 'receiver' },
                {
                    $project: {
                        otherUser: {
                            $cond: [
                                { $eq: [senderId, user] },
                                '$receiver',
                                '$sender'
                            ]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'Profile_model',
                        localField: 'otherUser._id',
                        foreignField: 'AccId',
                        as: 'profile'
                    }
                }, {
                    $unwind: 'profile'
                },
                {
                    $project: {
                        _id: '$otherUser._id',
                        username: '$otherUser.username',
                        role: '$otherUser.role',
                        profileUrl: '$profile.profile_pic'
                    }
                }
            ])
            if (!ConnectedUser) {
                res.status(404).json({ message: "connected user not found" })
            }
            res.status(200).json({ success: true, Data: ConnectedUser })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }

    }
    static async getRequestConnection(req, res) {
        try {
            const user = req.user._id.toString()

            const connectionRequest = await Connected.aggregate([

                {
                    $match: {
                        receiverId: user,
                        status: 'request'
                    }
                },
                {
                    $lookup: {
                        from: "User",
                        localField: 'senderId',
                        foreignField: '_id',
                        as: 'sender'
                    }
                },
                { $unwind: 'sender' },

                {
                    $lookup: {
                        from: 'Profile_model',
                        localField: 'otherUser._id',
                        foreignField: 'AccId',
                        as: 'profile'
                    }
                }, {
                    $unwind: { path: '$profile', preserveNullAndEmptyArrays: true }
                },
                {
                    $project: {
                        _id: '$otherUser._id',
                        username: '$otherUser.username',
                        role: '$otherUser.role',
                        profileUrl: '$profile.profile_pic'
                    }
                }
            ])
            if (!connectionRequest) {
                res.status(404).json({ message: "connected user not found" })
            }
            res.status(200).json({ success: true, Data: connectionRequest })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })

        }
    }
    static async getSuggestedUse(req, res) {

    }
    static async acceptRequest(req, res) {
        try {
            const io = req.app.get('io')
            const user = req.user._id.toString()
            const connectionId = req.params.id

            const result = await Connected.findByIdAndUpdate({ _id: connectionId, status: 'pending' },
                { status: 'accepted' },
                { new: true }
            ).populate('receiverId', 'username')
            if (!result) {
                res.status(404).json({ message: 'not accepted' })
            }
            const notify = await SendNotification(user,
                result.receiverId,
                `${result.receiverId.username} accept your connection request`,
                'connection')
            res.status(200).json({ message: "accepted user", data: result })
            io.to(result.receiverId,).emit('newNotification', notify)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })

        }
    }
    static async rejectRequest(req, res) {
        try {
            const io = req.app.get('io')
            const user = req.user._id.toString()
            const connectionId = req.params.id

            const result = await Connected.findByIdAndUpdate({ _id: connectionId, status: 'pending' },
                { status: 'rejected' },
                { new: true }
            ).populate('receiverId', 'username')
            if (!result) {
                res.status(404).json({ message: 'not found' })
            }
            const notify = await SendNotification(user,
                result.receiverId,
                `${result.receiverId.username} reject your connection request`,
                'connection')
            io.to(result.receiverId,).emit('newNotification', notify)

            res.status(200).json({ message: "reject user", data: result })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })

        }
    }
    static async sendRequest(req, res) {
        try {
            const user = req.user._id.toString()
            const receiver = req.params.id
            const io = req.app.get('io')

            const existing = await Connection.findOne({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            });
            if (existing) throw new Error("Request already exists.");

            await Connection.create({ senderId, receiverId, status: 'pending' });
            const notify = await SendNotification(user,
                receiver,
                `${result.receiverId.username} reject your connection request`,
                'connection')

            io.to(receiver).emit('newNotification', notify)
            res.status(200).json({ message: "request sent successfully" })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })

        }
    }
}