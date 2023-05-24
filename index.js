const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connection = require("./src/db/connection");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");

app.use(bodyParser.urlencoded({extended :  true}));
app.use(bodyParser.json());
app.use("/", routes);

const start = async ()=>{
    try{
        await connection();
        app.listen(3000, ()=>{
            console.log("localhost:3000");
        });
    }catch (error) {
        console.log(error);
        console.log("Failed to start the app");
    };
};

start();


