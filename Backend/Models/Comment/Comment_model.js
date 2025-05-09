const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'postType' },
  postType: { type: String, enum: ['Post', 'JobPost'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);
