const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        trim:true
    },

    email: 
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    mobile: 
    {
        type: Number,
        required: true,
        unique: true,
    }, 

    collegeId: 
    {
        type:ObjectId,
         ref: "colleges"
    },
        
    isDeleted: 
    {
        type:Boolean, 
        default: false
    },
},{timestamps:true})

module.exports = mongoose.model("intern",internSchema)