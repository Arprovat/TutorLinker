const mongoose = require('mongoose')
const { Schema } = mongoose

const educationSchema = new Schema({
    institute: { type: String, trim: true },
    year: { type: String, match: /^\d{4}-\d{4}$/ }
})
const experienceSchema = new Schema({
    title: { type: String, trim: true },
    year: { type: String, match: /^\d{4}-\d{4}$/ },
    about: { type: String, trim: true }


})
const User_profile_Schema = new Schema({
    AccId: { type: mongoose.Schema.ObjectId,required: true, ref: "User" },
    profile_pic: { type: String, },
    cover_pic:{type:String},
    Address: { type: String, },
    Skill: [{ type: String, trim: true }],
    education: [educationSchema],
    experience: [experienceSchema],
    gender: { type: String, enum: ['male', 'female'] },
    languages: [{ type: String, trim: true }],
    dob: { type: Date },
    contact:{
        phone:{type:String},
        Email:{type:String}
    },
    relationship: { type: String, enum: ['single', 'married', 'divorced'] },
    religious: { type: String, trim: true },
    isComplete:{type:Boolean,default:false}
},{timestamps:true});
User_profile_Schema.methods.hasMinimumInfo =function(){
  return(
    this.Skill?.length>0 &&
    this.education?.length>0&&
    this.profile_pic
  )
}
User_profile_Schema.pre('save',function(next){
this.isComplete=this.hasMinimumInfo()
next()
})

const Profile_model = mongoose.model('Profile_model',User_profile_Schema)

module.exports= Profile_model;