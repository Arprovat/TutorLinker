
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String },
  videoUrl: { type: String },
  content: { type: String, required: true },
  applicationId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Temporary'], required: true },
  location: { type: String },
  
  deadline: { type: Date },
  salary: { type: String },
},{timestamps:true});

module.exports = mongoose.model('JobPost', jobPostSchema);
