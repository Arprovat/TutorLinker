const SendNotification = require('../../Helper/SendNotification/SendNotication');
const { sendNotification } = require('../../Helper/SendNotification/SendNotication');
const CommentModel = require('../../Models/Comment/Comment_model');
const Connection = require('../../Models/Connected/Connected');
const PostModel = require('../../Models/Post/Post_Model');
const Profile_model = require('../../Models/User_Profile/User_profile');
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

            const newPost = await PostModel.create({
                content: content?.trim(),
                photoUrl: Array.isArray(photoUrl) ? photoUrl : [photoUrl],
                videoUrl: Array.isArray(videoUrl) ? videoUrl : [videoUrl],
                userId,
            })
            const Post = await PostModel.findById(newPost._id).populate('userId','username')
            const user = await UserModel.findById(userId).select('username').lean();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

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

            return res.status(201).json({ success: true, Data:Post  });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create post',
                error: process.env.NODE_ENV === 'development' ? err.message : null
            });
        }
    }
    static async getUserPost(req,res){
        try{
            const user = req.params.id

            const result = await PostModel.find({userId:user})
            .sort({ createdAt: -1 })
            .lean()
            .populate('userId')
            result.forEach(post => {
                post.userLiked = post.likes.includes(user);
                post.likeCount = post.likes.length;
                post.commentCount = post.comments.length;
            });

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
            const userId = req.user._id;

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
            console.log(posts)
            return res.status(200).json({ Data: posts });
        } catch (err) {
            return res.status(500).json({ message: 'Server error fetching posts' });
        }
    }
    static async getAPost(req, res) {
        try {
            const  postId  = req.params.id;
            console.log(postId)
            const userId = req.user._id;
            

            if (!postId ) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            const post = await PostModel.findById(postId).populate({path:'comments' ,populate:{path:'userId',select:'username'}}).populate('userId','username');
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            console.log(post)
            return res.status(200).json({ Data: post });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error while commenting on post' });
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
            const  postId  = req.params.id;
            const userId = req.user._id;
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
                if (post.userId.toString() !== userId) {
                    const user = await UserModel.findById(userId);
                    const notif = await SendNotification(
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
            const  postId  = req.params.id;
            const userId = req.user._id;
            const text = req.body.comment;
            const io = req.app.get('io');

            if (!postId || !text) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            let post = await PostModel.findById(postId).populate({path:'comments' ,populate:{path:'userId',select:'username'}}).populate('userId','username');
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const com = await CommentModel.create({ postId, postType: 'GeneralPost', userId, text });
            post.comments.push(com._id);
            await post.save();
            console.log(post,"comment")
            const commenter = await UserModel.findById(userId);
            const notified = new Set();
            console.log(post.userId._id.toString())
            if (post.userId._id.toString() !== userId) {
                const notifAuthor = await SendNotification(
                    userId,
                    post.userId._id.toString(),
                    `${commenter.username} commented on your post`,
                    'post'
                );
                io.to(post.userId._id.toString()).emit('newNotification', notifAuthor);
                notified.add(post.userId._id.toString());
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
                    const notif = await SendNotification(
                        userId,
                        cid,
                        `${commenter.username} also commented on a post you commented on`,
                        'post'
                    );
                    io.to(cid).emit('newNotification', notif);
                }
            }
            post = await PostModel.findById(postId)
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' }
            })
            .populate('userId', 'username');
            return res.status(200).json({ Data: post });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error while commenting on post' });
        }
    } }
module.exports= Post