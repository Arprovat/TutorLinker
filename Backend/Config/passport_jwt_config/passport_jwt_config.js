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
      console.log(jwt_payload);
      const user = await Users_auth_model.findById(jwt_payload.user_id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
