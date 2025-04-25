const passport = require('passport'); 
const { Strategy: JwtStrategy } = require('passport-jwt');
const Users_auth_model = require('../../Models/Users_auth/Users_auth_model');
require('dotenv').config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY,
  ignoreExpiration: false
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        if (!jwt_payload.user_id) {
            return done(null, false, { message: 'Invalid token payload' });
        }
        const user = await Users_auth_model.findById(jwt_payload.user_id); 
        if (!user) {
            return done(null, false, { message: 'User not found' }); 
        }
        return done(null, user);
    } catch (error) {
        return done(error, false, { message: 'Internal server error' });  
    }
  })
);

module.exports = passport
