const express = require('express');
const app = express();
const cors = require('cors');
const routers =require('./routers/routers')
require('dotenv').config()
const helmet = require('helmet');
var morgan = require('morgan');
const Mongo_config = require('./Config/MongoDB_config/MongoDB_config');


const PORT= process.env.PORT||8000;
app.use(express.json());
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors());
app.use('/api',routers)
app.get("/", function(req, res){
   res.send("hi this is tutorLinker Server");
});



Mongo_config().then(()=>app.listen(PORT,()=>{
    console.log("listening on",PORT);
}))