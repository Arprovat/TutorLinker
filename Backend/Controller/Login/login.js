const UsersAuthModel = require('../../Models/Users_auth/Users_auth_model');
const CreateToken = require('../../Helper/CreateToken/CreateToken');

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
      res.setHeader('Authorization', `Bearer ${access_token}`);
      req.headers['Authorization'] = `Bearer ${access_token}`;

      return res.status(200).json({
        message: "Login successful",
        success: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = Login;
