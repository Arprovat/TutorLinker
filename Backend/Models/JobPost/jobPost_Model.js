
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String },
  description: { type: String, required: true },
  applicationId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Temporary'], required: true },
  location: { type: String, require:true},
  coordinates:{
    type:{
      type:String,
      enum:['point'],
    },
    coordinates:{
      type:[Number]
    
  },
  workhours:{type:String,require:true},
  deadline: { type: Date,require:true },
  salary: { type: String, require:true},
},{timestamps:true});

jobPostSchema.index({coonrdinates:'2dsphere'})
module.exports = mongoose.model('JobPost', jobPostSchema);

