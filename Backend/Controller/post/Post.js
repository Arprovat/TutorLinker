const Post_Model = require("../../Models/Post/Post_Model");

class Post{

    static createPost=async(req,res)=>{
    try {
        const userId = req.user._id
        const{content,photoUrl,videoUrl} = req.body;
        if(!content &&(photoUrl|| photoUrl.length===0)&&(videoUrl||videoUrl.length===0) ){
           return res.status(400).json({message:"invalid information"})
        }
        const newPost = new Post_Model({
            content,
            photoUrl: Array.isArray(photoUrl)?photoUrl:[photoUrl],
            videoUrl:Array.isArray(videoUrl)?videoUrl:[videoUrl],
            userId})
        const result = await newPost.save();
    } catch (error) {
        res.status(500).json({
            message: "Server error while creating post",
            error:  error 
        });
    }
    }
}