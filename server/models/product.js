const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    }
    
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;