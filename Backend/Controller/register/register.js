const Users_auth_model = require("../../Models/Users_auth/Users_auth_model");
const jwt = require("jsonwebtoken")
const sendConfirmationEmail = require("../../Helper/EmailForConfirmation/EmailForConfirmation")

const register = async(req,res) =>{
    const {name ,email ,password,isTeacher} = req.body;
try {
    
    if (!name || !email || !password) {
        return res.status(404).json({ message: "Check name, email or password" });
    }
     let user = await Users_auth_model.findOne({email})
     if(user){
 return res.status(400).json({message:"user already exists"});
     }
    user=new Users_auth_model({username:name, email,password,role:isTeacher ? "teacher" : "student"})
    await user.save();
    const ConfirmationToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );   

    await sendConfirmationEmail(user,ConfirmationToken)
    return res.status(200).json({message: "Account created successfully"});
} catch (error) {
    console.error(error);
   return  res.status(500).json({message:"server error"});
}
}
module.exports = register;