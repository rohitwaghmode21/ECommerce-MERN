const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// addproduct
router.post("/addproduct", async(req, res) => {
    try{
        let product = new Product(req.body); // created new instance of Product model or created a copy of Product
        let savedProduct = await product.save();
        res.status(200).json({
            status : "Success",
            message : 'Res send to the user',
            savedProduct : savedProduct
        })
   
    }catch(e){
        res.status(404).json({
            status : "Failed",
            message : "Not able to send the Saved Product Details from Database"
        })
    }
})

// get all products from database
router.get("/getproducts", async(req, res) => {
    try{
        const allProducts = await Product.find();
        if(allProducts.length > 0){
           return res.send(allProducts);
        }else{
            return res.status(203).json({
                status : "Failed",
                message : "No Product found..."
            })
        }
    }catch(e){
        res.status(400).json({
            status : "Failure",
            message : "Not able to get all products from database..."
        })
    }
})

// update product
router.put("/update/:id", async(req, res) => {
    try{
        const updateProduct = await Product.updateOne({_id : req.params.id}, {$set : req.body});
        if(updateProduct){
            return res.status(200).json({
                status : "Success",
                message : "Successfully updated the Product",
                updateProduct : updateProduct
            })
        }else{
            return res.status(203).json({
                status : "Failure",
                message : "Not able to update the Product"
            })
        }
    }catch(e){
        res.status(400).json({
            status : "Failure",
            message : "Error occured while updating the Product"
        })
    }
})

// delete particular product
router.delete("/delete/:id", async(req, res) => {
    try{
        const deleteProduct = await Product.findOneAndDelete({_id : req.params.id});
        res.status(200).json({
            status : "Success",
            message : "deleted Product",
            deleteProduct : deleteProduct
        })
    }catch(e){
        res.status(400).json({
            status : "Failure",
            message : "Error occured while deleting the Product"
        })
    }
})
// we can delete the product by {_id : req.params.id} or (req.body)

// get a specific product
router.get("/getaproduct/:id", async(req, res) => {
    try{
        const singleProduct = await Product.findOne({_id : req.params.id});
        res.send(singleProduct);
    }catch(e){
        res.status(400).json({
            status : "failure",
            message : "Unable to get required Product details..."
        })
    }
})

// search a particular product
router.get("/search/:key", async (req, res) => {
    try{
        let searchedProduct = await Product.find({
            "$or" : [
            {
                productName : {$regex : req.params.key}
            },
            {
                category : {$regex : req.params.key}
            },
            {
                company : {$regex : req.params.key}
            }
        ]
        })
        res.send(searchedProduct)
    }catch(e){
        res.status(400).json({
            status : "Failed",
            message : "Not able to search sorry..."
        })
    }
})

module.exports = router;