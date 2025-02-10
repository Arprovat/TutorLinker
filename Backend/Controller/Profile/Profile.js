const Users_auth_model = require("../../Models/Users_auth/Users_auth_model");

class profile {

    static getProfile=(req, res) =>{
        res.json({
            message:"profile data",
            data : req.user
        })
    }

    static editProfile=(req, res) =>{
        
    }

   static changePassword =async (req,res)=>{

    try {
        const {oldPassword,newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({message:"Password is required"});
        }
     const user = await Users_auth_model.findById(req.user._id);
     if(!user){
        return res.status(404).json({message:"User not found"});
     }
     const isPasswordCorrect = await user.comparePassword(oldPassword);
     if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid old password"});
     }
     user.password = newPassword;
     await user.save();
     return res.status(200).json({message:"Password updated successfully"});
 
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }


   }

   static deleteAccount = async (req,res)=>{
    try {
        const {password} = req.body;
        if(!password){
            return res.status(400).json({message:"Password is required"});
        }
        const user = await Users_auth_model.findById(req.user._id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid password"});
        }

        await Users_auth_model.findByIdAndDelete(req.user._id);
        return res.status(200).json({message:"Account deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }

   }


   static getAllUsers = (req,res)=>{}
}
module.exports = profile