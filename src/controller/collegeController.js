const collegeModel = require("../model/collegeModel")
const internModel  = require("../model/internModel")


// globelly function for validate user entry

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

// globelly function for validate request body 


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

//solution1:

const collegeCreate = async function (req, res) {
    try {

        // mandatory  validation  >

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
            return
        }

        if (!isValid(requestBody.name)) {
            res.status(400).send({ status: false, message: 'college name is required' })
            return
        }

        if (!/^[a-zA-Z.-]+$/.test( requestBody.name)) {
            return res.status(400).send({ status: false, message: "Please enter valid college name " })
        }
        let check = await collegeModel.findOne({ name: requestBody.name })
        if (check) {
            return res.status(400).send({ status: false, message: "This college is already exist." })
        }
        
        
        if (!isValid(requestBody.fullName)) {
            res.status(400).send({ status: false, message: 'college full name is required' })
            return
        }
        if (!isValid(requestBody.logoLink)) {
            res.status(400).send({ status: false, message: 'logo link is required' })
            return
        }

        // unique validation  >

        let uniqueFullNameCheck = await collegeModel.findOne({fullName:requestBody.fullName})
        if(uniqueFullNameCheck){
        return res.status(400).send({status:false,msg:"this full  name already exist"})
        }

      // after validation create college

        let collegeCreate = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: collegeCreate })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}




const getcollegeDetails = async function (req, res) {
 try {
     let collegeName = req.query.collegeName;

     // request query params  validation

     if (!collegeName) {
         return res.status(400).send({ status: false, msg: "please provide college name in query params" })
     }

     collegeName = collegeName.toLowerCase()

     // college validation 

     let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false })
     if (!collegeDetail) {
        return res.status(400).send({ status: false, msg: "college not found please provide valid college name" })
     }

    
     
     let collegeDetail1 = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })
     let internDetail = await internModel.find({ collegeId: collegeDetail._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
    
     let result = {
         name: collegeDetail1.name,
         fullName: collegeDetail1.fullName,
         logoLink: collegeDetail1.logoLink,
         interests: internDetail
     }
    return res.status(200).send({ status: true, data: result })

 } catch (error) {
     return res.status(500).send({ status: false, msg: error.message })
 }

}



module.exports.collegeCreate = collegeCreate
module.exports.getcollegeDetails = getcollegeDetails


// 
// 