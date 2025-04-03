var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
const RegisterModel = require('../Models/RegisterModel');
const registerEndPoints = require('../middleware/register');
const loginEndPoints = require('../middleware/login');
const addStudentEndPoints = require('../middleware/Student/AddStudent');

// register endpoints
router.post('/register', registerEndPoints);

// login endpoint
router.post("/login", loginEndPoints);

// add new student
router.post("/add_student", addStudentEndPoints);


module.exports = router;
