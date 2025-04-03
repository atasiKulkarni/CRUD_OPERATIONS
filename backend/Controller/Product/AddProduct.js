
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const ProductModel = require('../../Models/ProductModel');


const AddProduct = function (req, res)
{
 const date = new Date();
  ProductModel.findOne({"prod_name":req.body.prod_name},function(err,person){
    if(err){
      
        res.send(err)
    }
    else if(person){
      res.status(400).send({
        message: "Product Already Exist",
        error_code:400,

      });
    }
    else{
      const userProduct = new ProductModel({
        prod_name: req.body.prod_name,
        prod_details: req.body.prod_details,
        prod_price: req.body.prod_price,
        prod_quantity: req.body.prod_quantity,
        prod_total: req.body.prod_price * req.body.prod_quantity,
        prod_date:date,
        image: process.env.BACKEND_URL + req.file.path,  
      });

      // save  new product
      userProduct.save(
        function(error,result) 
        {
          if(error)
          {
            res.status(500).send({
                message: "Error Creating Product",
                error,
              });
          }
          else
          {
            res.status(200).send({
                message: "Product Created Successfully",
                error_code:200,
                result,
              });
          }
        }
      )
    }
  })
  
  
 

      
       
   
}
module.exports = AddProduct;