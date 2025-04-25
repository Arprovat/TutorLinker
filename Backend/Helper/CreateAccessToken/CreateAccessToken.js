const jwt = require("jsonwebtoken");

const CreateAccessToken = async (user = null , id = '', email = '') => {
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


  return access_token ;
};

module.exports = CreateAccessToken;
