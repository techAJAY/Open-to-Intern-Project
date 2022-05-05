const express = require('express');
const router = express.Router();
const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")


router.post("/createCollege",collegeController.collegeCreate)

router.post("/createintern",internController.internCreate)


module.exports = router;