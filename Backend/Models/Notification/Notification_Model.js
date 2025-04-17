const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  type: { type: String, enum: ['post', 'connection', 'job', 'system'], required: true },
  isRead: { type: Boolean, default: false },
},{timestamps:true});

module.exports = mongoose.model('Notification', notificationSchema);
