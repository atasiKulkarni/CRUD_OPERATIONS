var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const auth = require("./auth");
const RegisterModel = require('../Models/RegisterModel');

const register = function (request, response)
{
    bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new RegisterModel({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        phone: request.body.phone,
        email: request.body.email,
        password: hashedPassword,
      });
      console.log("requested body",user)
      // save the new user
      user.save(
        function(error,result) 
        {
          if(error)
          {
            response.status(500).send({
                message: "Error creating user",
                error,
              });
          }
          else
          {
            response.status(201).send({
                message: "User Created Successfully",
                result,
              });
          }
        }
      )
       
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
}
module.exports = register;