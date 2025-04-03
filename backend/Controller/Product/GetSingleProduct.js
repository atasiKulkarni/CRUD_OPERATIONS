
var express = require('express');
var router = express.Router();

const ProductModel = require('../../Models/ProductModel');


const GetSingleProduct = function (request, response)
{
    console.log("get single id",request.params.id)
  ProductModel.findOne({_id:request.params.id},function(error,result) 
        {
          if(error)
          {
            response.status(500).send({
                message: "Error Getting Product",
                error,
              });
          }
          else
          {
            response.status(200).send({
              message: "Product Details",
              error_code:200,
              result
            });

           
          }
        }
    );
       
   
}
module.exports = GetSingleProduct;