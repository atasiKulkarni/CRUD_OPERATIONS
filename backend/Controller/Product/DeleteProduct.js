
var express = require('express');
var router = express.Router();
const ProductModel = require('../../Models/ProductModel');


const DeleteProduct = function (request, response)
{
    
  ProductModel.findByIdAndDelete(request.params._id,
   
        function(error,result) 
        {
          if(error)
          {
            response.status(500).send({
                message: "Error Deleting Product",
                error,
              });
          }
          else
          {
            response.status(201).send({
                message: "Product Deleted Successfully",
                error_code: 200
                
              });
          }
        }
    );
       
   
}
module.exports = DeleteProduct;