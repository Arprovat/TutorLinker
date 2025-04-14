/*const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const passport = require('passport');
const Users_auth_model = require('../../Models/Users_auth/Users_auth_model.js');
const CreateToken = require('../../Helper/CreateToken/CreateToken.js');

passport.use(
    new GoogleStrategy(
        {
        //    clientID: process.env.GOOGLE_CLIENT_ID, 
         //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
           // callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);

                let user = await Users_auth_model.findOne({ email: profile._json.email });

                if (!user) {
                    user = new Users_auth_model({
                        email: profile._json.email,
                        username: profile._json.name,
                        googleId: profile._json.id,
                        verified: true,
                    });
                    await user.save();
                }

                // Renamed token variables to avoid conflicts
                const { access_token, refresh_token } = await CreateToken(user);

                return done(null, { user, access_token, refresh_token });
            } catch (error) {
                return done(error, false);
            }
        }
    )
);
*/