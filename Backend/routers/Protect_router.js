const express = require('express');
const passport = require('passport');
const refreshAccessToken = require('../Middleware/RefreshAccessToken/Refresh_access_token');
const profile = require('../Controller/Profile/Profile');
const setAuthHeader = require('../Middleware/SetAuthHeader/SetAuthheader.js');
const Login = require('../Controller/Login/login.js');
require('../Config/passport_jwt_config/passport_jwt_config.js');
const Post = require("../Controller/post/Post.js");
const jobPost = require('../Controller/job_post/job_post.js');
const Connection = require('../Controller/Connection/Connection.js');
const getAllNotification = require('../Controller/Notification/Notification.js');
const router = express.Router();

// Public route (no authentication required)
router.get("/Logout", Login.logout);

// Apply auth-related middlewares to subsequent routes
router.use(setAuthHeader);         
router.use(refreshAccessToken);    
router.use(passport.authenticate('jwt', { session: false })); // JWT auth

router.get('/profile', profile.getProfile);
router.post("/EditProfile", profile.editProfile);
router.post("/ChangePassword", profile.changePassword);
router.post("/DeleteAccount", profile.deleteAccount);
router.get('/search',profile.SearchUser)

router.get('/post', Post.getAllPosts);
router.post('/CreatePost', Post.createPost);
router.put('/edit/:id', Post.editPost);
router.delete('/post/delete/:id', Post.deletePost);
router.post('/like/:id', Post.likePost);
router.post('/comment/:id', Post.commentOnPost);
router.get('/userPost',Post.getUserPost)

router.post('/createJObPost',jobPost.createPost)
router.get('/allJobPost',jobPost.AllPost)
router.get('/getUserJobPost',jobPost.getUserAllPost)
router.get('/getPost/:id',jobPost.getPost)
router.get('/Applicant/:postId',jobPost.AllApplicant)
router.post('/apply/:postId',jobPost.applyOnJob)


router.get('/getAllConnection',Connection.getALLConnection)
router.get('/getRequestUser',Connection.getRequestConnection)
router.put('/accept/:id',Connection.acceptRequest)
router.put('/reject/:id',Connection.rejectRequest)
router.post('sendRequest/:id',Connection.sendRequest)

router.get('/notification',getAllNotification)
module.exports = router;