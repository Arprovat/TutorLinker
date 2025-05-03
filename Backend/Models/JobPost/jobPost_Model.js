const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String },
  description: { type: String, required: true },
  subject: [{ type: String }],
  title:{type:String},
  applicationId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
  jobType: { type: String, enum: ['full-time', 'part-time', 'temporary'], required: true },
  location: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  hours: { type: String, required: true },
  deadline: { type: Date },
  salary: { type: String, required: true }
}, { timestamps: true });

jobPostSchema.index({ coordinates: '2dsphere' });
module.exports = mongoose.model('JobPost', jobPostSchema);
