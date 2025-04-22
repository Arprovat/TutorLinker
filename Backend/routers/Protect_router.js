const express = require('express');
const passport = require('passport');
const refreshAccessToken = require('../Middleware/RefreshAccessToken/Refresh_access_token');
const profile = require('../Controller/Profile/Profile');
const setAuthHeader = require('../Middleware/SetAuthHeader/SetAuthheader.js');
const Login = require('../Controller/Login/login.js');
require('../Config/passport_jwt_config/passport_jwt_config.js')
const Post = require("../Controller/post/Post.js")
const router = express.Router()

router.use(setAuthHeader)
router.use(refreshAccessToken)
router.get("/Logout",Login.logout);
router.use(passport.authenticate('jwt',{session:false}));


router.get('/profile',profile.getProfile);
router.post("/EditProfile",profile.editProfile);
router.post("/ChangePassword",profile.changePassword);
router.post("/DeleteAccount",profile.deleteAccount);

router.get('/post',Post.getAllPosts)
router.post('/CreatePost',Post.createPost)
router.put('/edit/:id',Post.editPost)
router.delete('/post/delete/:id',Post.deletePost)
router.post('/like/:id',Post.likePost)
router.post('/comment/:id',Post.commentOnPost)




module.exports = router