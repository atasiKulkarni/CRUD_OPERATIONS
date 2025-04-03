var express = require('express');
var router = express.Router();
const studentModel = require('../models/StudentModel');
const registerModel = require('../models/RegisterModel');
var multer = require('multer');
var upload = multer();

/* GET users listing. */
router.get('/getAll', function(req, res) 
{
    studentModel.find({}, function(err, data)
    {
        if(err){
            console.log("Error Occurred while fetching data", err);
        }
        else
        {
            console.log("Data", data);
            res.send({data: data});
        }
    });
});

// get single data
router.post('/getSingle/:id', function(req, res) 
{
    console.log("get id",req.params.id)
    studentModel.findById( req.params.id, function(err, data)
    {
        if(err){
            console.log("Error Occurred while fetching data", err);
        }
        else
        {
            console.log("Data", data);
            res.send({data: data});
        }
    });
});

// add student
router.post('/addStudent' ,function(req, res) 
{
    
    console.log("Request Body", req.body);
  
    const studentData = new studentModel(req.body);
    studentData.save(function(err)
    {
         if(err){
             console.log("Error Occurred while adding student", err);
         }
         else
         {
             console.log("Student added successfully");
             res.send("Student added successfully");
            
             
         }
    })
  
});

// delete data
router.get('/deleteUser/{id}', function(req, res) 
{
    studentModel.findOneAndDelete(req.params._id, function(err, data)
    {
        if(err){
            console.log("Error Occurred while fetching data", err);
        }
        else
        {
            console.log("Student Deleted successfully");
            res.send("Student Deleted successfully");
        }
    });
});


module.exports = router;
