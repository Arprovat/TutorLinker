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
const Google_router = require('./routers/Google_router');

const PORT= process.env.PORT||8000;

//express_json  middleware for parsing json data
app.use(express.json());
//morgan middleware for logging
app.use(morgan('tiny'))
//helmet middleware for security
app.use(helmet())
//passport middleware for authentication
app.use(passport.initialize());
//cors middleware for cross origin resource sharing
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials :  true,
        optionsSuccessStatus:200

    }
));
//cookie parser middleware for parsing cookies
app.use(cookieParser())

app.use('/api',routers)
app.get("/", function(req, res){
   res.send("hi this is tutorLinker Server");
});
app.use('/protect',router)
//google router for google authentication
//app.use('/auth',Google_router)


Mongo_config().then(()=>app.listen(PORT,()=>{
    console.log("listening on",PORT);
}))