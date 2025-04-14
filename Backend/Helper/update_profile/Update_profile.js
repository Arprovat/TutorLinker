const Profile_model = require("../../Models/User_Profile/User_profile")

const Update_profile=async(user_id,updateData) =>{
try{
    if(!user_id && Object.keys(updateData) ===0){
        throw new error ("invalid Data")
    }
    const existsUser= await Profile_model.findById({AccId:user_id})
    if(!existsUser){
        throw new error ("user not found")
    }
    if(updateData.skills){
        updateData.skills= [...existsUser.skills,...updateData.skills]
    }
    if(updateData.languages){
        updateData.languages=[...existsUser.languages,...updateData.languages]
    }
    if(updateData.education){
        updateData.education=[...existsUser.education,...updateData.languages]
    }
    if(updateData.experience){
        updateData.experiences=[...existsUser.experience,...updateData.languages]
    }

    const result = await Profile_model.findOneAndUpdate(
        {AccId:user_id},
        {$set:updateData},
        {new:true,runValidators:true}
    )
    result.hasMinimumInfo();
    await result.save()

    return result;
}
catch(error){
    throw new error ("profile update error",error)
}
}

module.exports= Update_profile;