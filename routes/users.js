const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateSignup = require("../../validation/register");
const validateLogin = require("../../validation/login");
// Load User model
const User = require("../../models/User");

routes.post("/register", (req,res){
    const {errors, isValid} = validateRegisterInput(req.body)

    if (!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email:req.body.email}).then(
        (user) => {
            if(user){
                return res.status(400).json({email:"Email in use"})
            }
            const newUser = User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }
            )

            bcrypt.genSalt(12, (err,salt) => {
                if(err) throw err
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err
                    newUser.password = hash
                    newUser.save().then(
                        (user)=>{
                            res.json(user)
                        }
                    ).catch(err => console.log(err)
                })

            })
        }
    )

})