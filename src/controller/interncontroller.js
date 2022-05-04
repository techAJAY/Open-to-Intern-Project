const mongoose = require('mongoose');
const internModel = require("../model/internModel");


const isvalid  = function(value){
    if(typeof value ==='undefine'  || value=== null) return false
    if(typeof value === 'string'   && value.trim().length===0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const internCreate = function(req,res){









}

module.exports.interCreate = internCreate