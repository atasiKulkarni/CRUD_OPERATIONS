
var express = require('express');
var router = express.Router();
const ProductModel = require('../../Models/ProductModel');


// const GetProduct = function (request, response)
// {
    
//     ProductModel.find({}, {__v:0},{sort:{timeStamp:-1}},function(err, data)
//     {
//         if(err){
//             console.log("Error Occurred while fetching data", err);
//         }
//         else
//         {
//             console.log("Data", data);
//             response.send({result: data});
//         }
//     });
       
   
// }

const GetProduct = async function (req, res)
{
    
    try {
        const products = await ProductModel.find().sort({ _id: -1 }).select("-__v");
        console.log("Fetched Data:", products);
        res.status(200).json({ result: products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Server error" });
    }
       
   
}
module.exports = GetProduct;