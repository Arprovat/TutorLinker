const jwt = require('jsonwebtoken');

const setAuthHeader = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).json({ message: "Access token not found in cookies" });
  }

  try {
    jwt.verify(access_token, process.env.JWT_SECRET_KEY);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next();
    }
    return res.status(401).json({ message: "Invalid access token" });
  }
};
  
module.exports = setAuthHeader;
