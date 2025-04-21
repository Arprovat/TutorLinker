const Comment_model = require("../../Models/Comment/Comment_model");
const Connected = require("../../Models/Connected/Connected");
const Notification_Model = require("../../Models/Notification/Notification_Model");
const Post_Model = require("../../Models/Post/Post_Model");

class Post{

    static createPost=async(req,res)=>{
    try {
        const io = req.app.get('io')
        const userId = req.user.user_id
        const{content,photoUrl,videoUrl} = req.body;
        if(!content &&(photoUrl|| photoUrl.length===0)&&(videoUrl||videoUrl.length===0) ){
           return res.status(400).json({message:"invalid information"})
        }
        const newPost = new Post_Model({
            content,
            photoUrl:photoUrl? Array.isArray(photoUrl)?photoUrl:[photoUrl]:[],
            videoUrl:videoUrl?Array.isArray(videoUrl)?videoUrl:[videoUrl]:[],
            userId})
         await newPost.save();
        
        const notifyUser= {
            userId,
            message:'you post has been published',
            type:'post'
        }
        await Notification_Model.create(notifyUser)
        io.to(userId).emit('newNotification',notifyUser,newPost._id)
 
        const connectedUser= await Connected.find({
            $or:[{senderId:userId},{receiverId:userId}],
            status:'accepted'
        })
        const connectedUserIds = connectedUser.map(conn=>{
            return conn.senderId==userId?conn.receiverId:conn.senderId
        })

        for (const connectedUserId of connectedUserIds){
            const notify=new Notification_Model({
                recipientId: connectedUserId,
                  senderId: userId,
                  message: `Your connection just posted a new post!`,
                  type: 'post'
            })
            await notify.save()
            io.to(connectedUserId).emit("newNotification",notify,newPost._id)
            
        }
        return res.status(201).json(newPost)

    } catch (error) {
        res.status(500).json({
            message: "Server error while creating post",
            error:  error 

        });
    }
    }
    static AllPost = async(req,res)=>{
        try {
            const {limit=10,page=1}=req.query
            const userId = req.user.user_id

            const posts= await Post_Model.find()
            .sort({createdAt:-1})
            .skip((page-1*Number(limit)))
            .limit(Number(limit))
            .lean
            
            posts.forEach(post => {
                post.UserLikeInPost=post.likes.include(userId)
                post.likeCount=post.likes.length;
                post.countComment= post.comments.length

            });

            return res.status(200).json({
                data:posts
            })

        } catch (error) {
            return res.status(500).json({
                message:"server error"
            })
        }
    }
    static EditPost =async(req,res)=>{
        try {
            const {postId} = req.params.id
            const {updateData}= req.body;
            const userId=req.user.user_id
            if(!userId && Object.keys(updateData) ===0){
                return res.status(400).json({message:"invalid Data"})
            }
            const ExitsPost=await Post_Model.findOne({_id:new ObjectId(postId)})
            if(!ExitsPost){
                return res.status(404).json({message:"post not found"})
            }
            if(updateData.photoUrl){
                updateData.photoUrl=[...ExitsPost.photoUrl,...updateData.photoUrl]
            }
            if(updateData.videoUrl){
                updateData.videoUrl=[...updateData.videoUrl,...ExitsPost.videoUrl]
            }
            const result = await Post_Model.findOneAndUpdate(
                    new ObjectId(postId),
                    {$set:updateData},
                    {new:true,runValidators:true}
            )
            return res.status(200).json({message:'Edit successful',data:result})
        
        } catch (error) {
            return res.status(500).json({
                message:"server error while editing post"
            })
        }
    }
    static DeletePost = async(req,res)=>{

        try {
            const {postId} = req.params;

            if(!postId){
                return res.status(400).json({message:'invalid data'})
            }

            await Post_Model.findByIdAndDelete(new ObjectId(postId))

            return res.status(200).json({
                success:true,
                message:"successfully delete"
            })
        } catch (error) {
            return res.status(500).json({
                message:"server error while Deleting post"
            })
        }

    }
    static likeInPost = async(req,res)=>{
        try {
            const userId = req.user.user_id
            const {postId} =req.params.id

            if(postId){
                return res.status(400).json({message:'invalid data'})
            }

            const post = await Post_Model.findById(postId)
            if(!post){
                return res.status(404).json({message:'post not found'})
            }
            const isLike = post.likes.includes(userId)
            if(isLike){
                post.likes.pull(userId)
            }
            else{
                post.likes.push(userId)
            }
            return res.status(200).json({likeCount:post.likes.length})
        } catch (error) {
           return res.status(500).json({message:'Server error while like in post',error:error})
        }
    }
    static comment= async(req,res)=>{
        try {
            const userId = req.user.user_id;
            const {postId} = req.params.id
            const {text} = req.body
            
            if(postId){
                return res.status(400).json({message:'invalid data'})
            }
            const post = await Post_Model.findById(postId)
            
                if(!post){
                    return res.status(404).json({message:'post not found'})
                }
                const comment= await Comment_model.create(
                    {postId,
                    postType:'GeneralPost',
                    userId,
                    text
                    }
                )
                post.comments.push(comment._id)
                const data = post.comments.populate()
                return res.status(200).json({data,message:'comment add'})
        } catch (error) {
            return res.status(500).json({message:'Server error while comment in post',error:error})

        }
    }
}
module.exports=Post