const SendNotification = require('../../Helper/SendNotification/SendNotication');
const { sendNotification } = require('../../Helper/SendNotification/SendNotication');
const CommentModel = require('../../Models/Comment/Comment_model');
const Connection = require('../../Models/Connected/Connected');
const PostModel = require('../../Models/Post/Post_Model');
const UserModel = require('../../Models/Users_auth/Users_auth_model');

class Post {
    static async createPost(req, res) {
        try {
            const io = req.app.get('io');
            const userId = req.user._id.toString();
            const { content, photoUrl = [], videoUrl = [] } = req.body;

            // Validate post content
            if (!content?.trim() && photoUrl.length === 0 && videoUrl.length === 0) {
                return res.status(400).json({ message: 'Post must contain content, photos, or videos' });
            }

            // Create post
            const newPost = await PostModel.create({
                content: content?.trim(),
                photoUrl: Array.isArray(photoUrl) ? photoUrl : [photoUrl],
                videoUrl: Array.isArray(videoUrl) ? videoUrl : [videoUrl],
                userId,
            });

            // Get user data for notifications
            const user = await UserModel.findById(userId).select('username').lean();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Corrected notification call
            await SendNotification(
                userId, // senderId
                userId, // receiverId
                'Your post has been published', // message
                'system' // type
            );

            const connections = await Connection.find({
                $or: [{ senderId: userId }, { receiverId: userId }],
                status: 'accepted'
            }).populate('senderId receiverId');

            // Process notifications
            const notified = new Set();
            for (const connection of connections) {
                const connId = connection.senderId._id.equals(userId)
                    ? connection.receiverId._id.toString()
                    : connection.senderId._id.toString();

                if (connId !== userId && !notified.has(connId)) {
                    try {
                        // Corrected notification call
                        await SendNotification(
                            userId, // senderId
                            connId, // receiverId
                            `${user.username} shared a new post`, // message
                            'post' // type
                        );
                        io.to(connId).emit('newNotification', {
                            message: `${user.username} shared a new post`,
                            type: 'post'
                        });
                        notified.add(connId);
                    } catch (notifError) {
                        console.error('Failed to notify:', connId, notifError);
                    }
                }
            }

            return res.status(201).json({ success: true, Data: newPost });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create post',
                error: process.env.NODE_ENV === 'development' ? err.message : null
            });
        }
    }
    static async getUserPost(req,res){
        try{
            const user = req.user._id.toString()

            const result = await PostModel.find({userId:user})
            .sort({ createdAt: -1 })
            .lean()
            .populate('userId')


            if(!result){
                res.status(404).json({message:'post not found'})
            }
            res.status(200).json({Data:result})
        }
        catch(error){
            return res.status(500).json({
                message: 'Failed to create post',
                error: process.env.NODE_ENV === 'development' ? err.message : null
            });
        }
    }
    static async getAllPosts(req, res) {
        try {
            const { limit = 10, page = 1 } = req.query;
            const userId = req.user.user_id;

            const posts = await PostModel.find()
                .sort({ createdAt: -1 })
                .skip((page - 1) * Number(limit))
                .limit(Number(limit))
                .lean()
                .populate('userId','username')

            posts.forEach(post => {
                post.userLiked = post.likes.includes(userId);
                post.likeCount = post.likes.length;
                post.commentCount = post.comments.length;
            });
            return res.status(200).json({ Data: posts });
        } catch (err) {
            return res.status(500).json({ message: 'Server error fetching posts' });
        }
    }

    static async editPost(req, res) {
        try {
            const { postId } = req.params;
            const updateData = req.body.updateData || {};
            const userId = req.user.user_id;

            if (!postId || Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            const existing = await PostModel.findById(postId);
            if (!existing) {
                return res.status(404).json({ message: 'Post not found' });
            }

            if (updateData.photoUrl) {
                updateData.photoUrl = [...existing.photoUrl, ...updateData.photoUrl];
            }
            if (updateData.videoUrl) {
                updateData.videoUrl = [...existing.videoUrl, ...updateData.videoUrl];
            }

            const updated = await PostModel.findByIdAndUpdate(
                postId,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return res.status(200).json({ message: 'Edit successful', Data: updated });
        } catch (err) {
            return res.status(500).json({ message: 'Server error while editing post' });
        }
    }

    static async deletePost(req, res) {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const result = await PostModel.findByIdAndDelete(postId);
            return res.status(200).json({ success: true, Data: result, message: 'Post deleted successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error while deleting post' });
        }
    }
    static async likePost(req, res) {
        try {
            const { postId } = req.params;
            const userId = req.user.user_id;
            const io = req.app.get('io');

            if (!postId) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const alreadyLiked = post.likes.includes(userId);
            if (alreadyLiked) {
                post.likes.pull(userId);
            } else {
                post.likes.push(userId);
                // Notify post author if not liking own post
                if (post.userId.toString() !== userId) {
                    const user = await UserModel.findById(userId);
                    const notif = await sendNotification(
                        userId,
                        post.userId.toString(),
                        `${user.username} liked your post`,
                        'post'
                    );
                    io.to(post.userId.toString()).emit('newNotification', notif);
                }
            }

            await post.save();
            return res.status(200).json({ likeCount: post.likes.length, postId });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error while liking post' });
        }
    }
    static async commentOnPost(req, res) {
        try {
            const { postId } = req.params;
            const userId = req.user.user_id;
            const {comment } = req.body;
            const io = req.app.get('io');

            if (!postId || !comment) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            const post = await PostModel.findById(postId).populate('comments');
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const com = await CommentModel.create({ postId, postType: 'GeneralPost', userId, comment });
            post.comments.push(com._id);
            await post.save();

            const commenter = await UserModel.findById(userId);
            const notified = new Set();

            if (post.userId.toString() !== userId) {
                const notifAuthor = await sendNotification(
                    userId,
                    post.userId.toString(),
                    `${commenter.username} commented on your post`,
                    'post'
                );
                io.to(post.userId.toString()).emit('newNotification', notifAuthor);
                notified.add(post.userId.toString());
            }

            const commenterIds = await CommentModel.find({ postId }).distinct('userId');
            const connections = await Connection.find({
                $or: [{ senderId: userId }, { receiverId: userId }],
                status: 'accepted',
            });
            const connIds = connections.map(c =>
                c.senderId.toString() === userId ? c.receiverId.toString() : c.senderId.toString()
            );

            for (const cid of commenterIds) {
                if (cid !== userId && !notified.has(cid) && connIds.includes(cid)) {
                    const userToNotify = await UserModel.findById(cid);
                    const notif = await sendNotification(
                        userId,
                        cid,
                        `${commenter.username} also commented on a post you commented on`,
                        'post'
                    );
                    io.to(cid).emit('newNotification', notif);
                }
            }

            return res.status(200).json({ data: post });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error while commenting on post' });
        }
    } }
module.exports= Post