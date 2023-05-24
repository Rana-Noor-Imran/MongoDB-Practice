const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    smsLimit : {
        type : Number,
    },
    smsService : {
        type : Boolean,
    },
    callService : {
        type : Boolean,
    },
    created_At : {
        type : Date,
    },
    updated_At : {
        type : Date
    },
});

const companyModal =  mongoose.model("Companie", companySchema);
module.exports = companyModal;