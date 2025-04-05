var express = require('express');
var router = express.Router();
const multer = require("multer")

const AddNewProduct = require('../Controller/Product/AddProduct');
const GetAllProduct = require('../Controller/Product/GetProduct');
const DeleteSigleProduct = require('../Controller/Product/DeleteProduct');
const EditSigleProduct = require('../Controller/Product/EditProduct');
const GetSigleProduct = require('../Controller/Product/GetSingleProduct');

var upload = multer({ dest: '../uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});


router.get('/', (req, res) => {
    res.send('Hello from the Product API 🚀');
  });

// add new product
router.post('/add_product', upload.single('image'), AddNewProduct);

// get all product
router.get("/get_all_product",GetAllProduct );

// delete single product
router.delete("/delete_product/:    _id",DeleteSigleProduct );

// edit single product
router.put("/edit_product/:_id",upload.single('image'),EditSigleProduct );

// get single product
router.get("/get_single_product/:id",GetSigleProduct );

module.exports = router;
