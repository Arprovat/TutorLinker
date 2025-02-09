const express = require('express');
const register = require('../Controller/register/register');
const verifyEmail = require('../Controller/VerifyEmail/VerifyEmail');
const Login = require('../Controller/Login/login')
const router = express.Router();


router.get('/test', function(req, res){
    res.send("this test api")
})
//register routes
router.post("/RegisterUser", register)
router.get("/confirm/:token",verifyEmail)
router.post('/login', Login.login)


module.exports = router