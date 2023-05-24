const express =  require("express");
const routes = express.Router();
const company = require("../models/company");

routes.route("/").get( async (req,res)=>{
    let companyData = await company.find({}); // returns array of documents
    res.send(companyData);
});

routes.route("/create-one").get((req,res)=>{
    let companyObject = {
        name : "Vital Aims",
        email : "vitalaims@gmail.com",
        smsLimit : 500,
        smsService : false,
        callService : false,
        created_At : new Date(),
    };

    company.collection.insertOne(companyObject).then((doc)=>{
        console.log(doc);
        res.send(doc);
    }).catch((error)=>{
        console.log(error.message);
        res.send("Failed to create the company");
    });
});

routes.route("/create-many").get( async (req,res)=>{
    let companyArray = [
        {
            name : "Vital Aims Tech Solution",
            email : "vitalaimstechsolution@gmail.com",
            smsLimit : 500,
            smsService : true,
            callService : false,
            created_At : new Date(),
        },
        {
            name : "MS-Tech Solutions",
            email : "mstechsolutions@gmail.com",
            smsLimit : 500,
            smsService : false,
            callService : true,
            created_At : new Date(),
        },
        {
            name : "Testing Company",
            email : "testingcompany@gmail.com",
            smsLimit : 500,
            smsService : true,
            callService : true,
            created_At : new Date(),
        },
        {
            name : "Vital Aims Hub",
            email : "vitalaimshub@gmail.com",
            smsLimit : 1000,
            smsService : true,
            callService : true,
            created_At : new Date(),
        },
    ];
    await company.insertMany(companyArray).then((doc)=>{ //returns array of inserted documents
        console.log(doc);
        res.send(doc)
    }).catch((error)=>{
        console.log(error.message);
        res.send("Failed To insert Many");
    });
});

routes.route("/count-query").get(async (req,res)=>{
    const countedData = await company.count({smsLimit : 500}); //returns the number of 
    console.log(countedData);
});

routes.route("/find").get(async (req,res)=>{
    const foundData = await company.find(
        {smsLimit : 500, callService : false, smsService : false}, //condition to find 
        {_id : 1, name : 1, created_At : 1} // specifying fields in result
    );
    console.log(foundData);
    res.send(foundData);
});

routes.route("/findOne-update").get(async (req,res)=>{
    await company.findOneAndUpdate(
        { "name" : "Testing Company" },
        { $inc : {smsLimit : 200}, updated_At : new Date()},
        {upsert:true, returnNewDocument : true}
    ).then((doc)=>{
        console.log(doc);
    });
});

module.exports = routes;