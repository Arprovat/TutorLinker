const Update_profile = require("../../Helper/update_profile/Update_profile");
const Connected = require("../../Models/Connected/Connected");
const Profile_model = require("../../Models/User_Profile/User_profile");
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model");

class profile {



    static  async getProfile  (req, res) {
        try {
            const user = req.user._id.toString()
            if (user) {
                const profileData = await Profile_model.findOne({ AccId: user }).populate('AccId')
                if (!profileData) {
                    return res.status(404).json({ message: "profile data not found" })
                }
                const connection = await Connected.find(
                    {
                        $or: [{ senderId: user }, { receiverId: user }],
                    }
                )
                return res.status(200).json({ message: "profile found" , success: true, Data: profileData ,Connection:connection })
            }
            return res.status(404).json({ message: "invalid user" })
        } catch (error) {
            return res.status(400).json({ Error: error })
        }
    }



    static  async editProfile (req, res) {
        try {
            const user = req.user._id
            const updateData = req.body;
            console.log(user,updateData)
            const updateProfile = await Update_profile(user, updateData)
            if (updateProfile) {
                return res.status(200).json({
                    message: "your profile update successful",
                    success: true,
                    Data: updateProfile
                })
            }
            return res.status(404).json({
                message: "update error",
                error: true
            })
        } catch (error) {
            return res.status(400).json({ message: 'Internal server error' })
        }
    }



    static  async changePassword  (req, res)  {

        try {
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: "Password is required" });
            }
            const user = await Users_auth_model.findById(req.user.user_id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordCorrect = await user.comparePassword(oldPassword);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid old password" });
            }
            user.password = newPassword;
            await user.save();
            return res.status(200).json({ message: "Password updated successfully" });

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }


    }


  static async getAProfile(req,res){
    try {
        const userId= req.params.id
        if(!userId){
            return res.status(400).json({success:false,message:"invalid data"})
        }
        const profileData = await Profile_model.findOne({AccId:userId}).populate('AccId','username')
        if (!profileData) {
            return res.status(404).json({ message: "profile data not found" })
        }
        return res.status(200).json({ message: "profile found" , success: true, Data: profileData })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
  }
    static  async deleteAccount  (req, res)  {
        try {
            const { password } = req.body;
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const user = await Users_auth_model.findById(req.user.user_id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid password" });
            }

            await Users_auth_model.findByIdAndDelete(req.user.user_id);
            return res.status(200).json({ message: "Account deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }

    }


    static async SearchUser(req, res) {
        try {
            const {searchQuery} = req.params;
            console.log(searchQuery)
            if (!searchQuery) { 
                return res.status(401).json({ message: "Missing searchQuery parameter" });
            }
    
            const escapedQ = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('^' + escapedQ, 'i'); 
            const pipeline = [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'AccId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' },
                { $match: { 'user.username': { $regex: regex } } },
                {
                    $project: {
                        _id: '$user._id',
                        username: '$user.username',
                        photoUrl: '$profile_pic'
                    }
                },
                { $limit: 10 }
            ];
    
            const result = await Profile_model.aggregate(pipeline);
            res.status(200).json({ Data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }    
}
module.exports = profile