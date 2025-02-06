const express = require('express');
const router = express.Router();


router.get('/test', function(req, res){
    res.send("this test api")
})

module.exports = router