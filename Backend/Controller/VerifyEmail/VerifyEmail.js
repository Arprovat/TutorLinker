const jwt = require("jsonwebtoken");
const Users_auth_model = require("../../Models/Users_auth/Users_auth_model");


const verifyEmail =async (req, res) => {
   try {
    const {token} = req.params
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

    const user = await Users_auth_model.findOneAndUpdate({_id:decode.id},{verified:true},{new: true});

    if(!user){
        return res.status(400).jsonJ({
            message:"User not found"
        })
    }
    return res.status(200).jsonJ({
        message:"Account confirmed successfully,you can now login "
    })
   } catch (error) {
    res.status(error.status).jsonJ({
        message:"invalid or expired token"
    })
   }
};

module.exports =verifyEmail