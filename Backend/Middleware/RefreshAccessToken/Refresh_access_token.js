const jwt = require('jsonwebtoken');
const CreateAccessToken = require('../../Helper/CreateAccessToken/CreateAccessToken');

const refreshAccessToken = async (req, res, next) => {
  const oldAccessToken = req.cookies.access_token;
  console.log(oldAccessToken)
  if (!oldAccessToken) {
    return res.status(401).json({ message: "No access token provided" });
  }

  try {
    // Verify old token
    const decoded = jwt.verify(oldAccessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log(decoded)
    return next();

  } catch (err) {
    if (err.name !== 'TokenExpiredError') {
      return res.status(401).json({ message: "Invalid access token" });
    }

    // Token expired: try refresh
    const refreshToken = req.cookies.refresh_token;
    console.log('refrash',refreshToken)
    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }

    try {
      console.log('re')
      const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
console.log(refreshDecoded)
      // Create new access token
    const access_token = await CreateAccessToken(null,
         refreshDecoded.user_id,
        refreshDecoded.user_email
      );
console.log("new",access_token)
      // Set cookie
      res.cookie("access_token", access_token, {
        httpOnly: true,
        
      });
      // Verify the new token (signature + expiry)
      const newDecoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
      req.user = newDecoded;
      console.log(newDecoded)
      return next();

    } catch {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  }
};

module.exports = refreshAccessToken;
