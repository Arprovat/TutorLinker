const Profile_model = require("../../Models/User_Profile/User_profile")

const Update_profile=async(user_id,updateData) =>{
try{
    if(!user_id && !Object.keys(updateData).length ===0){
        throw new error ("invalid Data")
    }
    const existsUser= await Profile_model.findOne({AccId:user_id})
    if(!existsUser){
        throw new error ("user not found")
    }
   
    const result = await Profile_model.findOneAndUpdate(
        {AccId:user_id},
        {$set:updateData},
        {new:true,runValidators:true,upsert:true}
    ).populate('AccId')
    result.hasMinimumInfo();
    await result.save()
    return result;
}
catch(error){
    throw new error ("profile update error",error)
}
}

module.exports= Update_profile;