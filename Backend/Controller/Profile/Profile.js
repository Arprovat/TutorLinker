const Update_profile = require("../../Helper/update_profile/Update_profile");
const Profile_model = require("../../Models/User_Profile/User_profile");
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model");

class profile {



    static  async getProfile  (req, res) {
        try {
            const user = req.user._id.toString()
            console.log("user",user)
            if (user) {
                const profileData = await Profile_model.findOne({ AccId: user }).populate('AccId')
                console.log(profileData)
                if (!profileData) {
                    return res.status(404).json({ message: "profile data not found" })
                }
                return res.status(200).json({ message: "profile found" , success: true, Data: profileData })
            }
            return res.status(404).json({ message: "invalid user" })
        } catch (error) {
            return res.status(400).json({ Error: error })
        }
    }



    static  async editProfile (req, res) {
        try {
            const user = req.user._id.toString()
            const updateData = req.body;
            console.log("update",updateData)
            const updateProfile = await Update_profile(user, updateData)
            if (updateProfile) {
                return res.status(200).json({
                    message: "update successful",
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


    static async SearchUser  (req, res)  {
try {
    const q = req.query
        const regex = new RegExp('^' + q, 'i');
       const pipeline =[
        {
            $lookup:{
                from:'User',
                localField:'AccId',
                foreignField:'_id',
                as:'user'
            }
        },
        { $unwind: '$user' }, 
        { $match: { 'user.username': { $regex: regex } } },
        {
            $project: {
              _id: 0,
              username: '$user.username',
              photoUrl: '$profile_pic'
            }
          },
         
          { $limit: 10 }
       ]

       const result = await User_profile.aggregate(pipeline)
       res.status(200).json({  Data: result });
     
} catch (error) {
    return res.status(500).json({ message: "Internal server error" });

}
    }      
}
module.exports = profile