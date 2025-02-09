const express = require('express');
const app = express();
const cors = require('cors');
const routers =require('./routers/routers')
require('dotenv').config()
const helmet = require('helmet');
var morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Mongo_config = require('./Config/MongoDB_config/MongoDB_config');
const router = require('./routers/Protect_router');


const PORT= process.env.PORT||8000;
app.use(express.json());
app.use(morgan('tiny'))
app.use(helmet())
app.use(passport.initialize());
app.use(cors());
app.use(cookieParser())
app.use('/api',routers)
app.get("/", function(req, res){
   res.send("hi this is tutorLinker Server");
});
app.use('/auth',router)


Mongo_config().then(()=>app.listen(PORT,()=>{
    console.log("listening on",PORT);
}))