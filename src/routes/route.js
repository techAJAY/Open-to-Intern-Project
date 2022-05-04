const express = require('express');
const router = express.Router();
const collegeController = require("../controller/collegeController")



router.post("/createCollege",collegeController.collegeCreate)


module.exports = router;