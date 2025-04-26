const jobPost_Model = require("../../Models/JobPost/jobPost_Model")
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model")

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
            const authorNotif = await sendNotification(
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
    static async applyOnjob(req,res){
        try {
            const { postId } = req.params;
            const user_id = req.user.user_id.toString()
            const {resumeUrl}=req.body

            if(!postId&&!user_id){
                return res.status(400).json({message:'invalid request'})
            }
            const existUser = await Users_auth_model.findById(user_id)
            if(!existUser){
                return res.status(404).json({message:'user not found'})
            }
            const existpost = await jobPost_Model.findById(postId)
            if(!existpost){
                return res.status(404).json({message:'post not found'})
            }
            


            
        } catch (error) {
            return res.status(500).json({ message: 'Server error while creating post' });

        }
    }
}