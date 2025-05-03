const SendNotification = require("../../Helper/SendNotification/SendNotication")
const job_Application_model = require("../../Models/Job-Application/job_Application_model")
const jobPost_Model = require("../../Models/JobPost/jobPost_Model")
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model")
const moment = require('moment')

class jobPost {
    static async createPost(req, res) {
        try {
            const io = req.app.get('io');
            const userId = req.user._id;
            const { photoUrl, description, jobType, location, lat, lng, hours, deadline, title, subject, salary } = req.body;

            if (!description || !jobType || !location || !hours || !salary) {
                return res.status(400).json({ message: "Missing required fields", error: true });
            }

            const existUser = await Users_auth_model.findById(userId);
            if (!existUser) {
                return res.status(404).json({ message: "User not found", error: true });
            }
            if (existUser.role === 'teacher') {
                return res.status(403).json({ message: "A Teacher can't post job posts", error: true });
            }

            const jobPost = await jobPost_Model.create({
                userId,
                photoUrl,
                title,
                description,
                jobType,
                location,
                subject,
                coordinates: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                hours,
                salary
            });

            const authorNotif = await SendNotification(
                userId,
                userId,
                'Your job post has been published',
                'system'
            );
            io.to(userId).emit('newNotification', authorNotif);

            return res.status(201).json({ success: true, message: 'Job post uploaded', data: jobPost });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error while creating post' });
        }
    }
    static async AllPost(req, res) {
        try {
            console.log('reach')
            const userId = req.user._id
            const { lat, lng, range } = req.query
            const { limit = 10, page = 1 } = req.query
            console.log("query", page, limit)
            console.log(lat, lng, range)
            let posts
            if (!userId) {
                return res.status(400).json({ message: 'user Id not found ' })
            }
            const existUser = await Users_auth_model.findById(userId)
            if (!existUser) {
                return res.status(404).json({ message: "user not found", error: true })
            }
            if (lng!=0 && lat!=0 && range) {
                posts = await jobPost_Model.find({
                    coordinates: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(lng), parseFloat(lat)]
                            },
                            $maxDistance: parseFloat(range) * 1000
                        }
                    }
                })
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean()
                    .populate('userId', 'username')
                console.log("location", posts)
                return res.status(200).json({ message: "post", Data: posts })
            }
            posts = await jobPost_Model.find()
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .populate('userId', 'username')

            return res.status(200).json({ Data: posts })
        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }
    }
    static async getUserAllPost(req, res) {
        try {
            const userId = req.user._id
            
            if (!userId) {
                return res.status(400).json({ message: 'user Id not found ' })
            }
            const existUser = await Users_auth_model.findById(userId)
            if (!existUser) {
                return res.status(404).json({ message: "user not found", error: true })
            }
            
            posts = await jobPost_Model.findById({userId:userId})
                .sort({ createdAt: -1 })
                .lean()
                .populate('userId', 'username')

            return res.status(200).json({ Data: posts })
        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }
    }
    static async getPost(req, res) {
        const postId = req.params.id

        if (!postId) {
            return res.status(400)
        }

        const post = await jobPost_Model.findById(postId)

        return res.status(200).json({ Data: post })
    }
    static async AllApplicant(req, res) {
        const postId = req.params
        if (!postId) {
            return res.status(400)
        }

        const applicant = await jobPost_Model.findById(postId).populate('applicationId')

        return res.status(200).json({ Data: applicant })

    }
    static async applyOnJob(req, res) {
        try {
            const { postId } = req.params;
            const user_id = req.user._id
            const { resumeUrl } = req.body
            const io = req.app.get('io')


            if (!postId && !user_id) {
                return res.status(400).json({ message: 'invalid request' })
            }
            const existUser = await Users_auth_model.findById(user_id)
            if (!existUser && !existUser.role === 'teacher') {
                return res.status(404).json({ message: 'you are not able to apply ' })
            }

            const existPost = await jobPost_Model.findById(postId)
            if (!existPost) {
                return res.status(404).json({ message: 'post not found' })
            }
            const deadline = moment(existPost.deadline, DD - MM - YYYY)
            const currentDate = moment()

            if (deadline.isAfter(currentDate)) {
                return res.status(201).json({ message: 'deadline is over' })
            }
            const application = await job_Application_model.create({
                jobPostId: postId,
                applicantId: user,
                resumeUrl,
                status: 'pending'

            })
            existPost.applicationId.push(application._id)
            existPost.save()
            const notify = await SendNotification(
                user,
                existPost.userId,
                `${existUser.username} apply on your job post`,
                'job'

            )
            io.to(existPost.userId.toString()).emit('newNotification', notify)
            return res.status(200).json({ message: "Apply successful", Data: application })


        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }
    }
}

module.exports = jobPost

