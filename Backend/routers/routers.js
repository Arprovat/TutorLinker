const express = require('express');
const register = require('../Controller/register/register');
const router = express.Router();


router.get('/test', function(req, res){
    res.send("this test api")
})
//register routes
router.post("/RegisterUser", register)



module.exports = router