const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

     name: 
     {                        
         type:String,               //example: iith
         unique:true,
         required:true,
         trim:true
     },

     fullName: 
     {
         type:String,               //example: `Indian Institute of Technology, Hyderabad`
         required:true,
         trim:true

     },

     logoLink:
     {
        type:String,
        required:true,
        trim:true
     },

     isDeleted:
      {
          type:Boolean, 
          default: false
       },

    }, {timestamps:true})

    module.exports = mongoose.model("colleges",collegeSchema)
       