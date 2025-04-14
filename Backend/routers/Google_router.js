const express = require("express");
const Google_router = express.Router();
const passport = require("passport");
require("../Config/Google_oAuth/Google_oAuth");


//Google_router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));

/*Google_router.get("/google/callback",passport.authenticate("google",{
    failureRedirect:`${process.env.FRONTEND_URL}/login`,
    session:false,
}),
(req,res)=>{
    const {user,access_Token,refresh_Token} = req.user;
    res.cookie("accessToken",access_Token,{httpOnly:true,secure:true,maxAge:10*60*1000});
    res.cookie("refreshToken",refresh_Token,{httpOnly:true,secure:true,maxAge:5*24*60*60*1000});
    res.redirect(`${process.env.FRONTEND_URL}/profile`);
});*/

module.exports = Google_router;
