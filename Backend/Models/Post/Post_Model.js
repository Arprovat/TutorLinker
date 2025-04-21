
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl:[{ type: String }],
  videoUrl: [{ type: String }],
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments:[{Type: mongoose.Schema.Types.ObjectId,ref:'Comment'}],
  
},{timestamps:true});

module.exports = mongoose.model('Post', postSchema);
 