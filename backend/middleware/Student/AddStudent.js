
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const auth = require("./auth");
const studentModel = require('../../Models/StudentModel');

const AddStudent = function (req, res)
{
    console.log("atasi", req.body);
  
    const studentData = new studentModel(req.body);
    console.log("atasi", studentData);
    studentData.save(function(err)
    {
         if(err){
             console.log("Error Occurred ", err);
         }
         else
         {
             console.log("Student added successfully");
             res.send("Student added successfully");
            
             
         }
    })
}
module.exports = AddStudent;