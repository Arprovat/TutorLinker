const passport = require('passport'); 
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Users_auth_model = require('../../Models/Users_auth/Users_auth_model');
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        if (!jwt_payload.user_id) {
            return done(null, false, { message: 'Invalid token payload' });
        }
        const user = await Users_auth_model.findById(jwt_payload.user_id);  // Simplified query syntax
        if (!user) {
            return done(null, false, { message: 'User not found' });  // Added error message
        }
        return done(null, user);
    } catch (error) {
        return done(error, false, { message: 'Internal server error' });  // Added error message
    }
  })
);

module.exports = passport
