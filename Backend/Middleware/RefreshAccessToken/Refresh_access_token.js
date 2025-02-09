const jwt = require('jsonwebtoken');
const CreateToken = require('../../Helper/CreateToken/CreateToken'); // Using CommonJS for consistency

const refreshAccessToken = async (req, res, next) => {
  const authToken = req.headers['Authorization'];
  // Validate that the Authorization header exists and is in the expected format.
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Invalid access token" });
  }

  const oldAccessToken = authToken.split(' ')[1];

  try {
    // Attempt to verify the old access token.
    const decoded = jwt.verify(oldAccessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    // Check if the error is specifically due to token expiration.
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      try {
        const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        const { access_token } = await CreateToken({ id: refreshDecoded.user_id, email: refreshDecoded.user_email });

        res.setHeader('Authorization', `Bearer ${access_token}`);
        req.headers['Authorization'] = `Bearer ${access_token}`;

        try {
          const newDecoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
          req.user = newDecoded;
          return next();
        } catch (verifyErr) {
          return res.status(500).json({ message: 'Failed to verify new access token' });
        }
      } catch (refreshErr) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    } else {
      // For any other token verification errors.
      return res.status(402).json({ message: "Invalid access token" });
    }
  }
};

module.exports = refreshAccessToken;
