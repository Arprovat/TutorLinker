const jwt = require("jsonwebtoken");

const CreateToken = async (user = '', id = '', email = '') => {
  const token_payload = {
    user_id: (user && user._id) ? user._id : id,
    user_email: (user && user.email) ? user.email : email
  };

  if (!token_payload.user_id || !token_payload.user_email) {
    throw new Error("Insufficient user data to create token");
  }

  const access_token = jwt.sign(
    token_payload,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '10m' }
  );

  const refresh_token = jwt.sign(
    token_payload,
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: '7d' }
  );

  return { access_token, refresh_token };
};

module.exports = CreateToken;
