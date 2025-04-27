const SendNotification = require("../../Helper/SendNotification/SendNotication")
const job_Application_model = require("../../Models/Job-Application/job_Application_model")
const jobPost_Model = require("../../Models/JobPost/jobPost_Model")
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model")
const moment =require('moment')
class jobPost {
    static async createPost(req, res) {
        try {
            const io = req.app.get('io')
            const user = req.user.user_id.toString()
            const { photoUrl, description, jobType, location, coordinates, workhours,
                deadline, salary } = req.body
            if (!user) {
                return res.status(400).json({ message: "user id not found", error: true })
            }
            if (!photoUrl && !description && !jobType && !location && !workhours &&
                !deadline && !salary) {
                return res.status(403).json({ message: "invalid data", error: true })
            }
            const existUser = await Users_auth_model.findById(user)
            if (!existUser) {
                return res.status(400).json({ message: "user not found", error: true })
            }
            if (existUser.role === 'teacher') {
                return res.status(400).json({ message: "A Teacher can't post job post", error: true })
            }

            const jobPost = await jobPost_Model.create(
                {
                    userId: user,
                    photoUrl, description, jobType, location,
                    coordinates: {
                        type: 'point',
                        coordinates: [coordinates.lag, coordinates.lat]
                    }
                    , workhours,
                    deadline, salary
                }
            )
            const authorNotif = await SendNotification(
                user,
                user,
                'Your post has been published',
                'system',
            );
            io.to(user).emit('newNotification', authorNotif);

            return res.status(200).json({ message: 'job post uploaded', Data: jobPost })
        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }


    }
    static async AllPost(req,res){
       try {
        const userId = req.user.user_id.toString()
        const {lat,lag,range}=req.body
        const {page,limit}= req.query
        let posts
        if(!userId){
            return res.status(400).json({message:'user Id not found '})
        }
        const existUser = await Users_auth_model.findById(userId)
        if(!existUser){
            return res.status(404).json({message:"user not found",error:true})
        }
        if( lag && lat && range){
            posts = jobPost_Model.find({
                coordinates:{
                    $near:{
                        $geometry:{
                            type:'point',
                            coordinates:[parseFloat(lag),parseFloat(lat)]
                        },
                        $maxDistance:parseFloat(range)*1000
                    }
                }
            })
            .skip((page-1)*limit)
            .limit(limit)
            .lean()

        return res.status(200).json({message:"post",Data:posts})
        }
        posts = await jobPost_Model.find()
        .skip((page-1)*limit)
        .limit(limit)
        .lean()
        
      return res.status(200).json({Data:posts})
       } catch (error) {
        return res.status(500).json({ message: 'Server error while creating post' });

       }
    }
    static async getPost(req,res){
        const postId = req.params

        if(!postId){
            return res.status(400)
        }
         
        const post = await jobPost_Model.findById(postId)

        return res.status(200).json({Data:post})
    }
    static async AllApplicant(req,res){
        const postId = req.params
        if(!postId){
            return res.status(400)
        }
         
        const applicant = await jobPost_Model.findById(postId).populate('applicationId')

        return res.status(200).json({Data:applicant})

    }
    static async applyOnJob(req,res){
        try {
            const { postId } = req.params;
            const user_id = req.user.user_id.toString()
            const {resumeUrl}=req.body
            const io = req.app.get('io')
            if(!postId&&!user_id){
                return res.status(400).json({message:'invalid request'})
            }
            const existUser = await Users_auth_model.findById(user_id)
            if(!existUser && !existUser.role ==='teacher'){
                return res.status(404).json({message:'you are not able to apply '})
            }

            const existPost = await jobPost_Model.findById(postId)
            if(!existPost){
                return res.status(404).json({message:'post not found'})
            }
            const deadline= moment(existPost.deadline,DD-MM-YYYY)
            const currentDate=moment()

            if(deadline.isAfter(currentDate)){
               return res.status(201).json({message:'deadline is over'})
            }
            const application = await job_Application_model.create({
                jobPostId:postId,
                applicantId:user,
                resumeUrl,
                status:'pending'

            })
            existPost.applicationId.push(application._id)
            existPost.save()
            const notify = await SendNotification(
                user,
                existPost.userId,
                `${existUser.username} apply on your job post`,
                'job'

            )
io.to(existPost.userId.toString()).emit('newNotification',notify)
return res.status(200).json({message: "Apply successful",Data:application})
            
        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }
    }
}

module.exports = jobPost