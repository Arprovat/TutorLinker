const Connected = require("../../Models/Connected/Connected");
const Notification_Model = require("../../Models/Notification/Notification_Model");
const Post_Model = require("../../Models/Post/Post_Model");

class Post{

    static createPost=async(req,res)=>{
    try {
        const io = req.app.get('io')
        const userId = req.user._id
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
}