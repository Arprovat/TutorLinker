const UsersAuthModel = require('../../Models/Users_auth/Users_auth_model');
const CreateToken = require('../../Helper/CreateToken/CreateToken');
const jwt = require('jsonwebtoken');
const transport = require("../../Config/Mail_config/Mail_config");


class Login {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await UsersAuthModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const { access_token, refresh_token } = await CreateToken(user);

      const cookieOptions = {
        httpOnly: true,
        secure: true, 
      };

      res.cookie("access_token", access_token, cookieOptions);
      res.cookie("refresh_token", refresh_token, cookieOptions);
     // res.setHeader('Authorization', `Bearer ${access_token}`);
      // req.headers['Authorization'] = `Bearer ${access_token}`;

      return res.status(200).json({
        message: "Login successful",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: "Authentication failed" });
    }
  }
  static sendResetPasswordEmail = async (req,res)=>{
    try {
      const {email} = req.body;
      console.log(email);
      if(!email){
        return res.status(400).json({message:"Email is required"});
      }
      const user = await UsersAuthModel.findOne({email}).select("-password");
      console.log(user);
      if(!user){
        return res.status(404).json({message:"User not found"});
      }
      const secret= user._id+ process.env.JWT_SECRET_KEY;
      console.log(secret);
       const token = jwt.sign({user_id:user._id,user_email:user.email},secret,{expiresIn:"15m"});
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`;

      const mailOptions = {
        from:process.env.EMAIL_ADDRESS,
        to:email,
        subject:"Reset Password",
        html:`<p>Click on the following link to reset your password</p> <a href="${resetUrl} " style="background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 16px; text-decoration: none; border-radius: 5px;">Reset Password</a>`
      }
      await transport.sendMail(mailOptions);
      return res.status(200).json({message:"Reset password email sent check your email" ,success:true});

    } catch (error) {
      return res.status(500).json({message:"Internal server error"});

    }
  }
  static resetPassword = async (req,res)=>{
    try {
      const {user_id,token} = req.params;
      const {password} = req.body;
      if(!password){
        return res.status(400).json({message:"Password is required"});

      }
      const user = await UsersAuthModel.findOne({_id:user_id});
      if(!user){
        return res.status(404).json({message:"User not found"});
      }
      const secret= user_id+ process.env.JWT_SECRET_KEY;
      const Verify_token = jwt.verify(token,secret);
      if(!Verify_token){
        return res.status(401).json({message:"Invalid token"});
      }
      user.password = password;
      await user.save();
      return res.status(200).json({message:"Password reset successful" ,success:true});
    } catch (error) {
      return res.status(500).json({message:"Internal server error"});

    }
  }
  static logout = async (req,res)=>{
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(200).json({message:"Logout successful" ,logout:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});

    }
  }
}

module.exports = Login;
