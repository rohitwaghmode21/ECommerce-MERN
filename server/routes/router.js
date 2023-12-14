const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { body, validationResult } = require('express-validator');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'RESTAPI';

router.post("/register", body('name').isAlpha(), body('email').isEmail(), body('password').isLength({min : 5, max : 15}), async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({
                status : "Failed",
                message : "Error in sent request",
                errors : errors.array()
            })
        }

        const { name, email, password} = req.body;
        let userEmail = await User.findOne({email});
        if(userEmail){
            return res.status(404).json({
                status : "failed",
                message : "Email already exist"
            })
        }
        
        Bcrypt.hash(password, 10, async (err, hash) => {
                if(err){
                    return res.status(404).json({
                        status : "Failed",
                        message : "Error occured in hashing password"
                    })
                }
                userEmail = await User.create({
                    name,
                    email,
                    password : hash
                })
                res.status(200).json({
                    status : "Success",
                    message : "Successfully created the user",
                    userEmail : userEmail
                })
        })
    }catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

router.post('/login', async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({
                status : "Failed",
                message : "Error occured in req sent from client",
                errors : errors.array()
            })
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status : "Failed",
                message : "User is Not registered. Please register."
            })
        }
        Bcrypt.compare(password, user.password, async function(err, result){
                if(err){
                    return res.status(404).json({
                        status : "Failed",
                        message : "Error occured during Bcrypt compare"
                    })
                }

                if(result){
                    const Token =  "abc" +  jwt.sign({
                        data : user._id,
                        expiresIn : 60 * 60 * 24
                    }, secret)
                    return res.status(200).json({
                        status : "Success",
                        message : "Logged in successfully",
                        Token : Token
                    })
                }else{
                    return res.status(400).json({
                        status : "Failed",
                        message : "Password does not match"
                    })
                }
        })
    }catch(e){
        res.status(400).json({
            status : "Failed",
            message : 'Erroer in Login Process'
        })
    }
})

module.exports = router;