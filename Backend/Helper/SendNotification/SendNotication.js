const { sendNotification } = require('../../Helper/SendNotification/SendNotication');
const sendConfirmationEmail = require('../../Helper/EmailForConfirmation/EmailForConfirmation');
const socketManager = require('../../Helper/SocketManager/socketManager');
const CommentModel = require('../../Models/Comment/Comment_model');
const Connection = require('../../Models/Connection/Connection');
const NotificationModel = require('../../Models/Notification/Notification_Model');
const PostModel = require('../../Models/Post/Post_Model');
const UserModel = require('../../Models/Users_auth/Users_auth_model');
const mongoose = require('mongoose');

class PostController {
  /** Create a new post and notify connections */
  static async createPost(req, res) {
    try {
      const io = req.app.get('io');
      const userId = req.user.user_id;
      const { content, photoUrl = [], videoUrl = [] } = req.body;

      if (!content && photoUrl.length === 0 && videoUrl.length === 0) {
        return res.status(400).json({ message: 'Invalid information' });
      }

      const newPost = await PostModel.create({
        content,
        photoUrl: Array.isArray(photoUrl) ? photoUrl : [photoUrl],
        videoUrl: Array.isArray(videoUrl) ? videoUrl : [videoUrl],
        userId,
      });

      // Notify post author
      const authorNotif = await NotificationModel.create({
        recipientId: userId,
        message: 'Your post has been published',
        type: 'post',
        senderId: userId,
      });
      io.to(userId).emit('newNotification', authorNotif);

      // Notify accepted connections
      const connections = await Connection.find({
        $or: [{ senderId: userId }, { receiverId: userId }],
        status: 'accepted',
      });
      const connectionIds = connections.map(c =>
        c.senderId.toString() === userId ? c.receiverId : c.senderId
      );

      for (const connId of connectionIds) {
        const notif = await NotificationModel.create({
          recipientId: connId,
          senderId: userId,
          message: 'Your connection just posted a new post!',
          type: 'post',
        });
        io.to(connId.toString()).emit('newNotification', notif);
      }

      return res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error while creating post' });
    }
  }

  /** Get paginated posts with like/comment metadata */
  static async getAllPosts(req, res) {
    try {
      const { limit = 10, page = 1 } = req.query;
      const userId = req.user.user_id;
      
      const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * Number(limit))
        .limit(Number(limit))
        .lean();

      posts.forEach(post => {
        post.userLiked = post.likes.includes(userId);
        post.likeCount = post.likes.length;
        post.commentCount = post.comments.length;
      });

      return res.status(200).json({ data: posts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error fetching posts' });
    }
  }

  /** Edit a post by ID */
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

      // Merge arrays if provided
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

      return res.status(200).json({ message: 'Edit successful', data: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error while editing post' });
    }
  }

  /** Delete a post by ID */
  static async deletePost(req, res) {
    try {
      const { postId } = req.params;
      if (!postId) {
        return res.status(400).json({ message: 'Invalid data' });
      }
      await PostModel.findByIdAndDelete(postId);
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error while deleting post' });
    }
  }

  /** Like or unlike a post and notify author */
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

  /** Comment on a post and notify relevant users */
  static async commentOnPost(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.user_id;
      const { text } = req.body;
      const io = req.app.get('io');

      if (!postId || !text) {
        return res.status(400).json({ message: 'Invalid data' });
      }

      const post = await PostModel.findById(postId).populate('comments');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = await CommentModel.create({ postId, postType: 'GeneralPost', userId, text });
      post.comments.push(comment._id);
      await post.save();

      const commenter = await UserModel.findById(userId);
      const notified = new Set();

      // Notify post author
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

      // Notify other commenters
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

      return res.status(200).json({ comment });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error while commenting on post' });
    }
  }
}

module.exports = PostController;
