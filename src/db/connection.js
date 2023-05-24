const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try{
        console.log("Starting a connection");
        return await mongoose.connect(uri, {
            useNewUrlParser :  true,
            useUnifiedTopology : true,
        }).then(()=>{
            console.log("Database is connected successfully.");
        });
    }catch (error){
        console.log("Failed To connected Database");
        return error.message;
    };
};

module.exports= connectDB;