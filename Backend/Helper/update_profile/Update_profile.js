const Profile_model = require("../../Models/User_Profile/User_profile");

const Update_profile = async (user_id, updateData) => {
  try {
    if (!user_id || Object.keys(updateData).length === 0) {
      throw new Error("Invalid Data - Missing user ID or update data");
    }

    const existsUser = await Profile_model.findOne({ AccId: user_id });
    if (!existsUser) {
      throw new Error("User not found");
    }
   
 console.log('up',existsUser)
 const result = await Profile_model.findOneAndUpdate(
    { AccId: user_id },
    { $set: updateData }, 
    { 
      new: true,          
      runValidators: true, 
      context: 'query'     
    }
  ).populate('AccId');
     console.log('result',result)
    return result;
  } catch (error) {
    throw new Error(`Profile update failed: ${error.message}`);
  }
};

module.exports = Update_profile;