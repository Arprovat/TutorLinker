const express = require('express');
const passport = require('passport');
const refreshAccessToken = require('../Middleware/RefreshAccessToken/Refresh_access_token');
const profile = require('../Controller/Profile/Profile');
const setAuthHeader = require('../Middleware/SetAuthHeader/SetAuthheader.js');
require('../Config/passport_jwt_config/passport_jwt_config.js')
const router = express.Router()

router.use(setAuthHeader)
router.use(refreshAccessToken)

router.use(passport.authenticate('jwt',{session:false}));

router.get('/profile',profile.getProfile);

router.post("/EditProfile",profile.editProfile);







module.exports = router