const mongoose = require('mongoose');


const Mongo_config =async ()=>{
    try {
        const DBurl = process.env.DB_URL;
        
        if(!DBurl) throw new Error("DB_URL not specified")


    await mongoose.connect(DBurl);
        console.log("Connected to database");

        const connection = mongoose.connection;
        connection.on('error',(err )=>{
                console.error("connection error",err)
        })
    } catch (error) {
        console.error("connection error 1",error)
    }
}

module.exports = Mongo_config